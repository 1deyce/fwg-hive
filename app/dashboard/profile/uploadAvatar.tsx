"use client"

import { UploadDropzone } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";

export default function UploadAvatar() {
    const { toast } = useToast();
    return (
        <UploadDropzone
            endpoint="avatar"
            onClientUploadComplete={(res) => {
                console.log("Upload complete:", res);
                toast({
                    title: "Avatar uploaded successfully",
                    description: "Your avatar has been updated.",
                    variant: "default",
                });
            }}
            onUploadError={(err) => console.log(err)}
            className="ut-button:bg-background ut-button:ut-readying:bg-teal-600"
        />
    );
};
