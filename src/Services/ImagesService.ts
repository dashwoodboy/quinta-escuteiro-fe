import {Images} from "../Apis/CdnAgent";
import {defaultImage, quality} from "@cloudinary/url-gen/actions/delivery";
import {auto} from "@cloudinary/url-gen/qualifiers/quality";
import {CloudinaryImage} from "@cloudinary/url-gen";
import {IMAGES_ID} from "../Constants/ImagesIds";
import {fill} from "@cloudinary/url-gen/actions/resize";

export const getCdnImage = (imageId: string): CloudinaryImage => {
    return Images.GetImage(imageId).resize(fill()).delivery(quality(auto()));
};

export const getCdnImagePerson = (imageId: string): CloudinaryImage => {
    return Images.GetImage(imageId)
        .delivery(defaultImage(IMAGES_ID.PERSON_FALLBACK))
        .delivery(quality(auto()));
};
