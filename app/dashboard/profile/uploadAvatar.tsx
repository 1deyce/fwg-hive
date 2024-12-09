import {
    CldUploadWidget,
    CloudinaryUploadWidgetInfo,
    CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "@/components/ui/button";

export default function UploadAvatar() {
    const handleUpload = (results: CloudinaryUploadWidgetResults) => {
        if (results.info && typeof results.info === "object") {
            const publicId = (results.info as CloudinaryUploadWidgetInfo).public_id;
            if (publicId) {
                saveImageUrlToDatabase(publicId);
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
            console.log(data)
            console.log("Image URL saved successfully:", data);
        } catch (error) {
            console.error("Error saving image URL:", error);
        }
    };

    return (
        <div>
            <CldUploadWidget uploadPreset="avatars" onSuccess={handleUpload}>
                {({ open }) => {
                    return <Button onClick={() => open()}>Upload an Image</Button>;
                }}
            </CldUploadWidget>
        </div>
    );
}
