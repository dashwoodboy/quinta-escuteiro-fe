import axios from "axios";
import {ApiEndpoints} from "../Constants/ApiEndpoints";
import {ActivityInput} from "../Models/ActivityInput";
import {ActivityDto} from "../DTOs/ActivityDto";
import {s3} from "../Providers/S3Provider";
import { v4 as uuidv4 } from 'uuid';
import {S3CONSTANTS} from "../Constants/S3Constants";
import {InfrastructureInput} from "../Models/InfrastructureInput";
import {InfrastructureDto} from "../DTOs/InfrastructureDto";

export const createInfrastructure = async (infrastructure: InfrastructureInput) => {

  try {
    let icon = infrastructure.icon;

    if (infrastructure.file !== null) {

      icon = uuidv4()

      const params = {
        Bucket: S3CONSTANTS.BUCKET,
        Key: S3CONSTANTS.INFRASTRUCTURES_KEY.replace("{id}", icon),
        Body: infrastructure.file,
        Contents: infrastructure.file.type
      }

      await s3.upload(params).promise()
    }
    console.log("here")
    const infrastructureDto: InfrastructureDto = {
      infrastructureNamePt: infrastructure.infrastructureNamePt,
      infrastructureNameEn: infrastructure.infrastructureNameEn,
      aboutInfrastructurePt: infrastructure.aboutInfrastructurePt,
      aboutInfrastructureEn: infrastructure.aboutInfrastructureEn,
      icon: icon
    }

    const response = await axios.post(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ADD_INFRASTRUCTURES}`, infrastructureDto)

    if (response.status !== 201) {
      throw new Error("error_creating")
    }

  } catch (e) {
    throw new Error('error_creating')
  }
}

export const updateInfrastructure = async (infrastructure: InfrastructureInput) => {
  if (!infrastructure.infrastructureId) {
    return
  }

  try {
    let icon = infrastructure.icon;

    if (infrastructure.file !== null) {

      icon = uuidv4()

      const params = {
        Bucket: S3CONSTANTS.BUCKET,
        Key: S3CONSTANTS.INFRASTRUCTURES_KEY.replace("{id}", icon),
        Body: infrastructure.file,
        Contents: infrastructure.file.type
      }

      await s3.upload(params).promise()
    }
    const infrastructureDto: InfrastructureDto = {
      infrastructureNamePt: infrastructure.infrastructureNamePt,
      infrastructureNameEn: infrastructure.infrastructureNameEn,
      aboutInfrastructurePt: infrastructure.aboutInfrastructurePt,
      aboutInfrastructureEn: infrastructure.aboutInfrastructureEn,
      icon: icon
    }

    const response = await axios.put(
      `${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.UPDATE_INFRASTRUCTURE.replace("{id}", infrastructure.infrastructureId)}`,
        infrastructureDto
    )

    if (response.status !== 200) {
      throw new Error("error_uploading")
    }

  } catch (e) {
    throw new Error('error_uploading')
  }

}

export const removeInfrastructure = async (infrastructureId?: string) => {
  if (!infrastructureId) {
    return
  }

  const response = await axios.delete(
    `${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.DELETE_INFRASTRUCTURE.replace("{id}", infrastructureId)}`
  )

  if (response.status !== 200) {
    throw new Error("error_removing_infrastructure")
  }

}


export const getInfrastructureImageId = (infrastructureImageId: string) => {
  return S3CONSTANTS.INFRASTRUCTURES_KEY.replace("{id}", infrastructureImageId)
}
