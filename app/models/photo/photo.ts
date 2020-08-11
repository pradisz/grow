import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PhotoModel = types
  .model("Photo")
  .props({
    id: types.identifier,
    caption: types.string,
    likes: types.number,
    image: types.model({
      thumb: types.string,
      regular: types.string,
    }),
    user: types.model({
      name: types.string,
      avatar: types.string,
    }),
    link: types.string
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type PhotoType = Instance<typeof PhotoModel>
export interface Photo extends PhotoType { }
type PhotoSnapshotType = SnapshotOut<typeof PhotoModel>
export interface PhotoSnapshot extends PhotoSnapshotType { }
