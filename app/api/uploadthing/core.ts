import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/verify-token";
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    console.log("Token: ", token);

    if (!token) {
        throw new Error("No token provided");
    }

    const user = await verifyToken(token);
    if (!user) {
        throw new Error("Invalid token or user not found");
    }
    console.log(user);

    return { id: user.userId };
};

export const ourFileRouter = {
    avatar: f({
        image: { maxFileSize: "4MB" },
    })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            if (!user) throw new UploadThingError("Unauthorized");
            console.log("User from middleware:", user);
            return { userId: user.id, customId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("File URL:", file.url);

            await updateUserAvatar(metadata.userId, file.key);
            return { uploadedBy: metadata.customId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;


async function updateUserAvatar(userId: string, fileKey: string) {
    const client = await clientPromise;
    const db = client.db("fitnessHub");
    try {
        await db.collection("users").updateOne(
            { id: userId },
            { $set: { avatar: fileKey } }
        );
        console.log("Updated avatar for userId:", userId);
    } catch (error) {
        console.error("Error updating user avatar:", error);
        throw new Error("Error updating user avatar");
    }
}
