import { PhotoStoreModel, PhotoStore } from "./photo-store"

test("can be created", () => {
  const instance: PhotoStore = PhotoStoreModel.create({})

  expect(instance).toBeTruthy()
})