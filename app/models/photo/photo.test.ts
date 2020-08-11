import { PhotoModel, Photo } from "./photo"

test("can be created", () => {
  const instance: Photo = PhotoModel.create({})

  expect(instance).toBeTruthy()
})