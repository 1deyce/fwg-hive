"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import useUserStore from "@/zustand/store/userStore";

export default function UploadAvatar() {
    const [avatar, setAvatar] = useState<File[] | null>(null);
    const { toast } = useToast();
    const { getUser } = useUserStore();
    const user = getUser();

    if (!user) throw new Error("User not found for avatar upload");

    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (avatar && avatar.length > 0) {
            const formData = new FormData();
            formData.append("file", avatar[0]);
            formData.append("userId", user.userId);

            try {
                const response = await fetch("/api/upload-avatar", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Upload failed");
                }

                const data = await response.json();
                console.log(data);
                toast({
                    title: "Upload successful!",
                    description: `File uploaded`,
                });
            } catch (error) {
                if (error instanceof Error) {
                    toast({
                        title: "Upload failed",
                        description: error.message,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Upload failed",
                        description: "An unknown error occurred.",
                        variant: "destructive",
                    });
                }
            }
        } else {
            toast({
                title: "No file selected",
                description: "Please select a file to upload.",
                variant: "destructive",
            });
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setAvatar([file]);
            console.log("Files selected:", files);
        } else {
            setAvatar(null);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                multiple={false}
                className="border border-dashed border-gray-500 p-2"
            />
            <div className="h-48">
                {avatar && avatar.length > 0 ? <p>{avatar[0].name}</p> : <p>No file uploaded</p>}
            </div>
            <Button onClick={handleUpload} className="mt-4">
                Upload Avatar
            </Button>
        </div>
    );
}
