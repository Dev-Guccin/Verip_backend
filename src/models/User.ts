import { Schema, model } from "mongoose"

// 1. Create an interface representing a document in MongoDB
interface User {
  userId: string
  email: string
  pw: string
  fileName: string
}
// 2. Create a Schema corresponding to the document interface
const UserSchema = new Schema<User>({
  userId: {
    // userId의 속성을 정의한다.
    type: String,
    required: true, // 반드시 필요함.
    unique: true, // 유니크 명시
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pw: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    requied: true,
  },
})

// 3. create a Model and export the Model
export default model<User>("User", UserSchema)
