import AWS from "aws-sdk";
import {S3Context} from "../Contexts/S3Context";
import {ReactElement, useContext} from "react";
import {S3CONSTANTS} from "../Constants/S3Constants";

// Create S3 singleton
export const s3 = new AWS.S3({
  accessKeyId: '86pM9OQpSjvpSIbHweUu',
  secretAccessKey: 'unNWt42KjojxK2KhZnEl0lNCevgzKQ5mPhnNaLqA',
  endpoint: new AWS.Endpoint('https://daplstorage.zapto.org:9000'), // Replace with your MinIO endpoint
  s3ForcePathStyle: true, // Necessary for MinIO compatibility
  sslEnabled: true,
  signatureVersion: 'v4',
});

const getImageUrl = async (imageName: string) => {

  try {
    await s3.headObject({Bucket:S3CONSTANTS.BUCKET , Key: imageName}).promise()

    return s3.getSignedUrl('getObject', {
      Bucket: 'quintaescuteiro',
      Key: imageName,
      Expires: 300,
    });
  } catch (e) {
    throw e
  }
}

const uploadImage = async (file: File) => {

}

type Props = {
  children?: ReactElement | ReactElement[]
}

export const S3Provider = ({ children }: Props) => {
  return (
    <S3Context.Provider value={{getImageUrl}}>
    {children}
    </S3Context.Provider>
  )
};

export const useS3 = () => useContext(S3Context);

