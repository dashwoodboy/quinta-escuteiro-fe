export interface ActivityInput {
  id?: string
  titlePt: string
  titleEn: string
  smallMessagePt: string
  smallMessageEn: string
  messagePt: string
  messageEn: string
  outside: boolean
  icon: string,
  file: File | null
}
