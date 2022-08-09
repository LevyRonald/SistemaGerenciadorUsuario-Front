import { extend } from "vee-validate"
import { validatorPassword } from "./validators"

export const password = extend('password', {
    validate: validatorPassword,
    message: 'Sua {_field_} deve conter pelo menos uma letra maiúscula, uma minúscula e um dígito',
})
  