import * as yup from 'yup'

const userSchema = yup.object({
    username: yup.string().min(4).max(20).required(),
    password: yup.string().min(6).required()
})

export default userSchema