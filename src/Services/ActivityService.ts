import axios from "axios";
import {ApiEndpoints, REACT_APP_API_LOCATION} from "../Constants/ApiEndpoints";
import {ActivityInput} from "../Models/ActivityInput";
import {ActivityDto} from "../DTOs/ActivityDto";
import {s3} from "../Providers/S3Provider";
import { v4 as uuidv4 } from 'uuid';
import {S3CONSTANTS} from "../Constants/S3Constants";

export const createActivity = async (activity: ActivityInput) => {

  try {
    let icon = activity.icon;

    if (activity.file !== null) {

      icon = uuidv4()

      const params = {
        Bucket: S3CONSTANTS.BUCKET,
        Key: S3CONSTANTS.ACTIVITIES_KEY.replace("{id}", icon),
        Body: activity.file,
        Contents: activity.file.type
      }

      await s3.upload(params).promise()
    }
    const activityDto: ActivityDto = {
      titlePt: activity.titlePt,
      titleEn: activity.titleEn,
      smallMessagePt: activity.smallMessagePt,
      smallMessageEn: activity.smallMessageEn,
      messagePt: activity.messagePt,
      messageEn: activity.messageEn,
      outside: activity.outside,
      icon: icon
    }

    const response = await axios.post(`${REACT_APP_API_LOCATION}${ApiEndpoints.ADD_ACTIVITIES}`, activityDto)

    if (response.status !== 201) {
      throw new Error("error_creating")
    }

  } catch (e) {
    throw new Error('error_creating')
  }
}

export const updateActivity = async (activity: ActivityInput) => {
  if (!activity.id) {
    return
  }

  try {
    let icon = activity.icon;

    if (activity.file !== null) {

      icon = uuidv4()

      const params = {
        Bucket: S3CONSTANTS.BUCKET,
        Key: S3CONSTANTS.ACTIVITIES_KEY.replace("{id}", icon),
        Body: activity.file,
        Contents: activity.file.type
      }

      await s3.upload(params).promise()
    }
    const activityDto: ActivityDto = {
      titlePt: activity.titlePt,
      titleEn: activity.titleEn,
      smallMessagePt: activity.smallMessagePt,
      smallMessageEn: activity.smallMessageEn,
      messagePt: activity.messagePt,
      messageEn: activity.messageEn,
      outside: activity.outside,
      icon: icon
    }

    const response = await axios.put(
      `${REACT_APP_API_LOCATION}${ApiEndpoints.UPDATE_ACTIVITY.replace("{id}", activity.id)}`,
      activityDto
    )

    if (response.status !== 200) {
      throw new Error("error_uploading")
    }

  } catch (e) {
    throw new Error('error_uploading')
  }

}

export const removeActivity = async (activityId?: string) => {
  if (!activityId) {
    return
  }

  const response =await axios.delete(
    `${REACT_APP_API_LOCATION}${ApiEndpoints.DELETE_ACTIVITY.replace("{id}", activityId)}`
  )

  if (response.status !== 200) {
    throw new Error("error_removing_activity")
  }

}

export const getActivityImageId = (activityImageId: string) => {
  return S3CONSTANTS.ACTIVITIES_KEY.replace("{id}", activityImageId)
}
