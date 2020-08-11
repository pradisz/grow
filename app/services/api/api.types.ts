import { GeneralApiProblem } from "./api-problem"
import { PhotoSnapshot } from "../../models/photo"

export interface User {
  id: number
  name: string
}

export type GetPhotosResult = { kind: "ok", photos: PhotoSnapshot[] } | GeneralApiProblem
