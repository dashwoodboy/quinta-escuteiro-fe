import {createContext} from "react";


interface S3Props {
  getImageUrl: (imageName: string) => Promise<string>,
}


// @ts-ignore
export const S3Context = createContext<S3Props>(null);
