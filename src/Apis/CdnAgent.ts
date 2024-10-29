import {Cloudinary} from "@cloudinary/url-gen";

export const cld = new Cloudinary({cloud: {cloudName: "dnvmv9mr9"}});

const request = {
    get: (imageId: string) => cld.image(imageId),
};

const Images = {
    GetImage: (imageId: string) => request.get(imageId),
};

export {Images};
