import React, {useEffect} from "react";
import AWS from "aws-sdk";
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
    const { isPending, error, data } = useQuery<string>({
        queryKey: [`image-${imageName}`],
        queryFn: async () => {
            return await getImageUrl(imageName)
        },
    })

    if (isPending) {
        return (
          <div className={`${className} flex justify-center items-center` }>
            <Loading color={"#0D6054"}/>
          </div>
        )
    } else if (data) {
        return <img className={className} src={data} alt="imagem"/>
    } else {
        return <img className={className} src={placeholder} alt="imagem"/>
    }
}
