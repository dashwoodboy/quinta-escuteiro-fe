export enum ApiEndpoints {

  RESERVATION_LIST = "/reservations",
  RESERVATION = "/reservations/:id",
  RESERVATION_STATE = "/reservations/:id/state",
  RESERVATION_CONFIRM = "/reservations/:id/confirm",

  ALL_ACTIVITIES = "/activities",
  ADD_RESERVATION = "/reservations",
  ADD_ACTIVITIES = "/activities",
  ACTIVITY = "/activities/{id}",
  UPDATE_ACTIVITY = "/activities/{id}",
  DELETE_ACTIVITY = "/activities/{id}",

  ALL_INFRASTRUCTURES = "/infrastructures",
  ADD_INFRASTRUCTURES = "/infrastructures",
  INFRASTRUCTURE = "/infrastructures/{id}",
  UPDATE_INFRASTRUCTURE = "/infrastructures/{id}",
  DELETE_INFRASTRUCTURE = "/infrastructures/{id}",
}

export const REACT_APP_API_LOCATION = "http://daplstorage.zapto.org:9015"
