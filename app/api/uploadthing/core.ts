import { verifyToken } from "@/lib/verify-token"; // Ensure this function is correctly implemented
import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: Request) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new UploadThingError("No token provided");
    }

    const user = await verifyToken(token);
    if (!user) {
        throw new UploadThingError("Invalid token or user not found");
    }

    return { userId: user.userId };
};

// FileRouter for your app
export const ourFileRouter = {
    avatar: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
    .middleware(async ({ req }) => {
        const user = await auth(req);
        console.log("User from middleware:", user);
        return { userId: user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for userId:", metadata.userId);
        console.log("File URL:", file.url);

        return {
            uploadedBy: metadata.userId,
            fileName: file.name,
            fileSize: file.size,
            fileUrl: file.url,
        };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;