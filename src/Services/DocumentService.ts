import {s3} from "../Providers/S3Provider";
import {S3CONSTANTS} from "../Constants/S3Constants";
import AWS from "aws-sdk";
import {Document} from "../Models/Document"

export const listDocuments = async ()=> {
    try {
        let allFiles: Document[] = [];

        const params: AWS.S3.Types.ListObjectsV2Request = {
            Bucket: S3CONSTANTS.BUCKET,
            Prefix: S3CONSTANTS.DOCUMENTS_LIST
        }


        const response = await s3.listObjectsV2(params).promise()

        if (response.Contents) {
            const fileNames = response.Contents.map((item) => ({
                  id: item.Key || "",
                  name: item.Key?.replace("documents/", "").replace(".pdf", "") || ""
              })
            )

            allFiles = [...allFiles, ...fileNames]
        }

        return allFiles
    } catch (error) {
        console.error("Error listing files:", error)
        throw error
    }
}

export const openDocument = async (file: string) => {

    try {
        const params: AWS.S3.Types.GetObjectRequest = {
            Bucket: S3CONSTANTS.BUCKET,
            Key: file,
        }

        const doc = await s3.getObject(params).promise()

        if (doc.Body) {
            // Create a blob from the file data
            const blob = new Blob([doc.Body as BlobPart], {
                type: doc.ContentType || 'application/octet-stream'
            })

            // Create download link
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = file.split('/').pop() || 'download'
            document.body.appendChild(a)
            a.click()

            // Cleanup
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            return true
        } else {
            throw new Error('No file received')
        }
    } catch (error) {
        throw error
    }

}

export const uploadDocument = async (file: File) => {
    try {
        const uploadParams: AWS.S3.Types.PutObjectRequest = {
            Bucket: S3CONSTANTS.BUCKET,
            Key: S3CONSTANTS.DOCUMENT_KEY.replace("{id}", file.name),
            Body: file,
            ContentType: file.type,
        }

        return  await s3.upload(uploadParams).promise()
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

export const deleteDocument = async (id: string) => {
    try {
        const deleteParams: AWS.S3.Types.DeleteObjectRequest  = {
            Bucket: S3CONSTANTS.BUCKET,
            Key: id
        }

        return  await s3.deleteObject(deleteParams).promise()
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
}
