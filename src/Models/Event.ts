import { EventTypes } from "./EventTypes";
import { CloudinaryImage } from "@cloudinary/url-gen";

export interface Event {
    id: string;
    name: string;
    description: string;
    image?: CloudinaryImage;
    type: EventTypes;
    year: number;
    month: number;
    startDay: number;
    duration: number;
}
