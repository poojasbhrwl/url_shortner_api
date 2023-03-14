import Joi from "joi"

export const registerUsersValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({"string.pattern.base":"Minimum eight characters, at least one letter, one number and one special character required"}),
        role: Joi.string().required().label('Role')
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

export const loginValidation = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().optional().label('Email'),
        password: Joi.string().required().label('Password')
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({"string.pattern.base":"Minimum eight characters, at least one letter, one number and one special character required"}),
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