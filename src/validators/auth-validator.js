const Joi = require('joi')

const registerSchema = Joi.object({
    userName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).trim().required().strip()
})

//const validate = schema => input =>{ }

exports.registerSchema = registerSchema;


const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
})

exports.loginSchema = loginSchema;

const productListSchema = Joi.object({
    ProductName: Joi.string().required(),
    price: Joi.string().required(),
    information: Joi.string().required(),
    image: Joi.string().required(),
    ProductType: Joi.string().required(),
})

exports.productListSchema = productListSchema;