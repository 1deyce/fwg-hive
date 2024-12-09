"use server";

import { NextResponse } from "next/server";
import { UTFile } from "uploadthing/server";
import { utapi } from "@/server/uploadThing";

export async function uploadFile(formData: FormData) {
    const fileEntry = formData.get("file");
    const userId = formData.get("userId");

    console.log("userid:", userId);
    console.log(fileEntry);

    if (!(fileEntry instanceof File)) {
        return NextResponse.json({ message: "No valid file uploaded." }, { status: 400 });
    }

    if (!userId || typeof userId !== "string") {
        return NextResponse.json(
            { message: "User ID is required and must be a string." },
            { status: 400 }
        );
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

    if (fileEntry.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { message: "File size exceeds the maximum limit." },
            { status: 400 }
        );
    }

    if (!ALLOWED_TYPES.includes(fileEntry.type)) {
        return NextResponse.json({ message: "Unsupported file type." }, { status: 400 });
    }

    console.log("File Entry:", {
        name: fileEntry.name,
        size: fileEntry.size,
        type: fileEntry.type,
    });

    try {
        const utFile = new UTFile([fileEntry], fileEntry.name, { customId: userId });

        console.log(JSON.stringify(utFile));

        const response = await utapi.uploadFiles(utFile);
        console.log(response);
        return NextResponse.json({ url: response}, { status: 200 }).toString();
    } catch (error) {
        console.error("Upload Error:", error);
        if (error instanceof Error) {
            console.error("Error Details:", {
                message: error.message,
                stack: error.stack,
                cause: error.cause,
            });
            return NextResponse.json({ message: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
        }
    }
}
