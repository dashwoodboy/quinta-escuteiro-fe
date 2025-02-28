import {ReservationInput} from "../Models/ReservationInput";
import axios from "axios";
import {ApiEndpoints} from "../Constants/ApiEndpoints";
import {ReservationDto} from "../DTOs/ReservationDto";
import {reservationsOptions} from "../Pages/Reservation/Utils";

export const createReservation = async (reservation: ReservationInput) => {

  const reservationDto: ReservationDto = {
    responsibleName: reservation.responsibleName,
    responsiblePhone: reservation.responsiblePhone,
    responsibleEmail: reservation.responsibleEmail,
    reservationType: reservation.typeReservationId,
    country: reservation.country,
    groupNumber: reservation.groupNumber,
    coreName: reservation.coreName,
    regionName: reservation.regionName,
    numberPersons: reservation.numberPersons,
    numberCubs: reservation.numberLobitos,
    numberExplorers: reservation.numberExploradores,
    numberPioneers: reservation.numberPioneiros,
    numberRovers: reservation.numberCaminheiros,
    numberNoScouts: reservation.numberNoScouts,
    numberChiefs: reservation.numberChiefs,
    sleepType: reservation.sleepType,
    arriveTime: reservation.arriveTime,
    departureTime: reservation.departureTime,
    groupName: reservation.groupName,
    nationalOrganization: reservation.nationalOrganization,
    address: reservation.address,
    city: reservation.city,
    postalCode: reservation.postalCode,
    nif: reservation.nif,
    numberParticipants: reservation.numberParticipants,
    numberTeachers: reservation.numberTeachers,
    ageInterval: reservation.ageInterval,
    activities: [...reservation.activitiesIds ?? [], ...reservation.activitiesOutsideIds ?? []],
    infrastructures: reservation.infrastructuresIds ?? []
  }

  const data = await axios.post(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.ADD_RESERVATION}`, reservationDto)
  console.log(data)
}

export const confirmReservation = async (reservationId: string): Promise<boolean> => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.RESERVATION_CONFIRM.replace(":id", reservationId)}?reservationState=1`)

    return response.status === 202;

  } catch (e) {
    return false
  }
}

export const closeReservation = async (reservationId: string): Promise<boolean> => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_LOCATION}${ApiEndpoints.RESERVATION_CONFIRM.replace(":id", reservationId)}?reservationState=2`)

    return response.status === 202;

  } catch (e) {
    return false
  }
}
