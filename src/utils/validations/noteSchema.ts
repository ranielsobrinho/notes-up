import * as yup from 'yup'

const noteSchema = yup.object({
    content: yup.string().min(5).required(),
    userId: yup.number().required()
})

export default noteSchema