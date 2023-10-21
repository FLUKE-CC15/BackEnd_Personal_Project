const { registerSchema, loginSchema } = require('../validators/auth-validator')
const bcrypt = require('bcryptjs')
const prisma = require('../models/prisma')
const jwt = require('jsonwebtoken')
const createError = require('../utils/create-error')

exports.register = async (req, res, next) => {
    try {
        console.log(req.body)
        const { value, error } = registerSchema.validate(req.body)
        if (error) {
            return next(error)
        }

        value.password = await bcrypt.hash(value.password, 12)
        const user = await prisma.user.create({ data: value })
        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'รักนะ', { expiresIn: process.env.JWT_EXPIRE })
        console.log(value)
        delete user.password
        res.status(201).json({ accessToken, user })
    } catch (err) {
        next(err);
    }
}
exports.login = async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        const user = await prisma.user.findFirst({
            where: { userName: value.userName }
        });
        if (!user) {
            return next(createError('invalid credential', 400))
        }

        const isMatch = await bcrypt.compare(value.password, user.password)
        if (!isMatch) {
            return next(createError('invalid credential', 400))
        }
        const payload = { userId: user.id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'รักนะ', { expiresIn: process.env.JWT_EXPIRE })
        console.log(value)
        delete user.password
        res.status(201).json({ accessToken, user })

    } catch (err) {
        next(err);
    }
}
exports.getMe = (req, res) => {
    res.status(200).json({ user: req.user });
};
