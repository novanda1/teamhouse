import * as yup from 'yup'

export const newTeamValidation = yup.object().shape({
    name: yup.string().required().min(3).max(25),
    description: yup.string().max(250)
})