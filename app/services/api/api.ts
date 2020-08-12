import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { PhotoSnapshot } from "../../models/photo"

const { ACCESS_KEY } = require("../../config/env")

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of photos by query
   */
  async getPhotos(page: number, query: string): Promise<Types.GetPhotosResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`search/photos?&query=${query}&page=${page}&client_id=${ACCESS_KEY}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // uppercase first char of caption
    const formatCaption = (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }

    const convertPhoto = (raw: any): PhotoSnapshot => {
      return {
        id: raw.id,
        caption: formatCaption(raw.alt_description || raw.description || `Uploaded by ${raw.user.name}`),
        likes: raw.likes,
        image: {
          thumb: raw.urls.thumb,
          regular: raw.urls.regular,
        },
        user: {
          name: raw.user.name,
          avatar: raw.user.profile_image.large
        },
        link: raw.links.html
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawPhotos = response.data.results
      const convertedPhotos: PhotoSnapshot[] = rawPhotos.map(convertPhoto)
      return { kind: "ok", photos: convertedPhotos }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
