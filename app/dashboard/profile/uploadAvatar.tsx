import { useEffect, useState } from "react";
import { getCldImageUrl } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import useUserStore from "@/zustand/store/userStore";
import { useToast } from "@/hooks/use-toast";
import FileUploadDropzone from "@/components/ui/custom-dropzone";
import Image from "next/image";

export default function UploadAvatar() {
    const { getUser, setUser } = useUserStore();
    const user = getUser();
    const { toast } = useToast();
    const [files, setFiles] = useState<File[]>([]);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/get-user");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [setUser]);

    const handleUpload = async () => {
        if (!files.length) {
            toast({
                variant: "destructive",
                title: "No files selected",
                description: "Please upload an image.",
            });
            return;
        }

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "avatars");

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const responseData = await response.json();
                if (responseData.secure_url) {
                    await saveImageUrlToDatabase(responseData.public_id);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const saveImageUrlToDatabase = async (publicId: string) => {
        try {
            const response = await fetch("/api/save-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ publicId }),
            });

            if (!response.ok) {
                throw new Error("Failed to save image URL");
            }

            toast({
                variant: "default",
                title: "Image uploaded successfully",
            });
        } catch (error) {
            console.error("Error saving image URL:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center">
            <FileUploadDropzone setFiles={setFiles} />
            <Button className="my-3 w-1/2 mx-auto" onClick={handleUpload}>
                Update Avatar
            </Button>
            {user && user.avatarUrl && (
                <Image
                    src={getCldImageUrl({ src: user.avatarUrl })}
                    alt="User Avatar"
                    width={300}
                    height={100}
                    className="rounded-md"
                />
            )}
        </div>
    );
}
