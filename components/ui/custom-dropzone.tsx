"use client";

import {
    FileUploader,
    FileInput,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/file-uploader";
import Image from "next/image";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";

const FileUploadDropzone = ({ setFiles }) => {
    const [files, setLocalFiles] = useState<File[]>([]);

    const dropzone = {
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
        },
        multiple: false,
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024, // 5 MB
    } satisfies DropzoneOptions;

    const handleFilesChange = (value: File[] | null) => {
        if (value) {
            setLocalFiles(value);
            setFiles(value);
        } else {
            setLocalFiles([]);
            setFiles(null); 
        }
    };

    return (
        <FileUploader value={files} onValueChange={handleFilesChange} dropzoneOptions={dropzone}>
            <FileInput>
                <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                    <p className="text-gray-400">Drop files here</p>
                </div>
            </FileInput>
            <FileUploaderContent className="flex items-center flex-row gap-2">
                {files.map((file, i) => (
                    <FileUploaderItem
                        key={i}
                        index={i}
                        className="size-20 p-0 rounded-md overflow-hidden"
                        aria-roledescription={`file ${i + 1} containing ${file.name}`}
                    >
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={80}
                            width={80}
                            className="size-20 p-0"
                        />
                    </FileUploaderItem>
                ))}
            </FileUploaderContent>
        </FileUploader>
    );
};

export default FileUploadDropzone;
