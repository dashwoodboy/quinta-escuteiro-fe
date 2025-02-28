import React from "react";
import {useQuery} from "@tanstack/react-query";
import { useS3 } from "../../Providers/S3Provider";
import {Loading} from "../Loading/Loading";
import placeholder from "./../../assets/placeholder_img.png";

interface ImageCdnProps {
    imageName: string
    className?: string
}

export function ImageCdn({imageName, className}: ImageCdnProps) {
    const {getImageUrl} = useS3();
    const { isPending, data } = useQuery<string>({
        queryKey: [`image-${imageName}`],
        queryFn: async () => {
            if (imageName === "")
                throw new Error()
            return await getImageUrl(imageName)
        },
    })

    if (imageName === "") {
        return <img className={className} src={placeholder} alt="imagem"/>
    }

    if (isPending) {
        return (
          <div className={`${className} flex justify-center items-center` }>
            <Loading/>
          </div>
        )
    } else if (data) {
        return <img className={className} src={data} alt="imagem"/>
    } else {
        return <img className={className} src={placeholder} alt="imagem"/>
    }
}
