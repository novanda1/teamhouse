import * as yup from 'yup'

export const newTeamValidation = yup.object().shape({
    name: yup.string().required().min(3).max(15),
    description: yup.string().required().min(10).max(200)
})