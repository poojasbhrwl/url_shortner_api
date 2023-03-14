import Joi from "joi"

export const urlValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        originalUrl: Joi.string().uri().required().label('Original Url')
    })
    const {
        error
      } = schema.validate(req.body);
      if (error) {
        res.status(400)
          .send(error.details);
      } else {
        next();
      }
}