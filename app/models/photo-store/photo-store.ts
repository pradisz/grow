import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { PhotoModel, PhotoSnapshot, Photo } from "../photo/photo"
import { withEnvironment } from "../extensions"

/**
 * Model description here for TypeScript hints.
 */
export const PhotoStoreModel = types
  .model("PhotoStore")
  .props({
    photos: types.optional(types.array(PhotoModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    savePhotos: (photoSnapshots: PhotoSnapshot[]) => {
      const newPhoto: Photo[] = photoSnapshots.map(c => PhotoModel.create(c))
      self.photos.push(...newPhoto)
    }
  }))
  .actions(self => ({
    getPhotos: flow(function * (page: number, query: string) {
      const result = yield self.environment.api.getPhotos(page, query)
      if (result.kind === "ok") {
        self.savePhotos(result.photos)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))
  .actions(self => ({
    clearPhotos: () => {
      self.photos.clear()
    }
  }))// eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type PhotoStoreType = Instance<typeof PhotoStoreModel>
export interface PhotoStore extends PhotoStoreType { }
type PhotoStoreSnapshotType = SnapshotOut<typeof PhotoStoreModel>
export interface PhotoStoreSnapshot extends PhotoStoreSnapshotType { }
