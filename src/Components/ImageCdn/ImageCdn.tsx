import React from "react";
import {CloudinaryImage} from "@cloudinary/url-gen";
import {AdvancedImage, placeholder} from "@cloudinary/react";

interface ImageCdnProps {
    image: CloudinaryImage;
    alt: string;
    className?: string;
}

export function ImageCdn({ image, alt, className }: ImageCdnProps) {
    return (
        <AdvancedImage
            cldImg={image}
            className={className}
            alt={alt}
            plugins={[placeholder({ mode: "blur" })]}
        />
    );
}
