import { CloudinaryImage } from "@cloudinary/url-gen";

export interface Person {
    id: string;
    name: string;
    image: CloudinaryImage;
}
