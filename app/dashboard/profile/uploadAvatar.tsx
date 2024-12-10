import { useEffect } from "react";
import {
    CldUploadWidget,
    CloudinaryUploadWidgetInfo,
    CloudinaryUploadWidgetResults,
    getCldImageUrl 
} from "next-cloudinary";
import { Button } from "@/components/ui/button";
import useUserStore from "@/zustand/store/userStore";
import { useToast } from "@/hooks/use-toast";

export default function UploadAvatar() {
    const { getUser, setUser } = useUserStore();
    const user = getUser();
    const { toast } = useToast();

    const fetchUserData = async () => {
        try {
            const response = await fetch("/api/get-user");
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpload = async (results: CloudinaryUploadWidgetResults) => {
        if (results.info && typeof results.info === "object") {
            const publicId = (results.info as CloudinaryUploadWidgetInfo).public_id;
            if (publicId) {
                await saveImageUrlToDatabase(publicId);
                await fetchUserData();
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

            const data = await response.json();
            toast({
                variant: "default",
                title: "Image uploaded successfully",
            });
            console.log("Image URL saved successfully:", data);
        } catch (error) {
            console.error("Error saving image URL:", error);
        }
    };

    return (
        // TODO: implement custom dropzone
        <div>
            <CldUploadWidget uploadPreset="avatars" onSuccess={handleUpload}>
                {({ open }) => {
                    return <Button onClick={() => open()}>Upload an Image</Button>;
                }}
            </CldUploadWidget>
            {user && user.avatarUrl && (
                <img src={getCldImageUrl({ src: user.avatarUrl, width: 300, height: 300 })} alt="User Avatar" />
            )}
        </div>
    );
}
