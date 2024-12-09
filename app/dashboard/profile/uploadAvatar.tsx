"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import useUserStore from "@/zustand/store/userStore";
import { uploadFile } from "@/app/actions";

export default function UploadAvatar() {
    const [avatar, setAvatar] = useState<File[] | null>(null);
    const { toast } = useToast();
    const { getUser } = useUserStore();
    const user = getUser();

    if (!user) throw new Error("User not found for avatar upload");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setAvatar([file]);
            console.log("Files selected:", file);
        } else {
            setAvatar(null);
        }
    };

    return (
        <div>
            <form action={uploadFile}>
                <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border border-dashed border-gray-500 p-2"
                />
                <input type="hidden" name="userId" value={user.userId} />
                {/* <div className="h-48">
                    {avatar ? <p>{avatar.name}</p> : <p>No file uploaded</p>}
                </div> */}
                <Button type="submit" className="mt-4">
                    Upload Avatar
                </Button>
            </form>
        </div>
    );
}
