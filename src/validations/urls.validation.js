import Joi from "joi"

export const urlValidation = (body) => {
    const schema = Joi.object().keys({
        originalUrl: Joi.string().uri().required().label('Original Url'),
        baseUrl: Joi.string().required().label('Base Url')
    })
    return schema.validateAsync(body)
}