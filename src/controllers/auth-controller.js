const { registerSchema, loginSchema, ProductSchema } = require('../validators/auth-validator')
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


exports.allproduct = async (req, res, next) => {
    try {
        const getproduct = await prisma.Product.findMany()
        res.status(201).json({ getproduct })
    } catch (err) {
        console.log(err)
        next(err);
    }
}

exports.allOrder = async (req, res, next) => {
    try {
        const getOrder = await prisma.Order.findMany({
            include: {
                product: true,
                user: true
            }
        })
        console.log(getOrder)
        res.status(201).json({ getOrder })
    } catch (err) {
        console.log(err)
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        await prisma.Product.findFirst({
            where: {
                id: +req.body.id
            }
        });
        // if (!product) {
        //     return res.status(404).json({ error: "Product not found" });
        // }
        await prisma.Product.delete({ where: { id: +req.body.id } });
        res.status(201).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log(err)
        next(err);
    }
}

exports.updatedProduct = async (req, res, next) => {
    try {
        console.log(req.body)
        const { ProductName, price, information, image, productType } = req.body;
        const updatedProduct = await prisma.Product.update({
            where: { id: +req.body.id },
            data: {
                ProductName,
                price,
                information,
                image,
                productType,
            },
        });
        res.status(200).json({ updatedProduct });
    } catch (err) {
        console.log(err)
        next(err);
    }
}


exports.uploadProductImg = async (req, res, next) => {
    try {
        const productImg = await prisma.Product.create({
            data: {
                image,
            },
        });

        res.status(200).json(productImg);
    } catch (err) {
        console.log(err)
        next(err);
    }
}
exports.createProduct = async (req, res, next) => {
    try {
        const { value } = ProductSchema.validate(req.body)
        const product = await prisma.Product.create({ data: value })
        res.status(201).json({ product })
    } catch (err) {
        console.log(err)
        next(err);
    }
}

exports.createOrder = async (req, res, next) => {
    console.log(req.body, "----------")
    const userId = req.body.user;
    const productId = req.body.product;
    try {
        const order = await prisma.Order.create({
            data: {
                paySlip: req.body.paySlip,
                user: {
                    connect: {
                        id: userId,
                    }
                },
                product: {
                    connect: {
                        id: productId,
                    }
                },
            },
        });
        res.status(200).json({ order });
    } catch (err) {
        console.log(err)
        next(err);
    }
}

exports.getMe = (req, res) => {
    res.status(200).json({ user: req.user });
};
