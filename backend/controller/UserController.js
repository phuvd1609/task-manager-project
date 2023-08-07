const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User } = require('../db/models/user.model')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const result = await User.create({
            email: email,
            hashedPassword: hashedPassword,
        })
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
        return res.json({
            message: "Sign up successfully",
            status: 200,
            data: { email: email, token: token },
        })
    }
    catch (e) {
        if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
            return res.json({
                message: "Existed email",
                status: 500,
                data: { detail: e },
            })
        }
        else {
            return res.json({
                message: "Sign up failed",
                status: 500,
                data: { detail: e },
            })
        }

    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const foundUser = await User.findOne({ email: email })
        if (!foundUser) {
            return res.json({
                message: "User not found",
                status: 500,
                data: {},
            })
        }

        const checkPassword = await bcrypt.compare(password, foundUser.hashedPassword)
        if (checkPassword) {
            const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
            return res.json({
                message: "Log in successfully",
                status: 200,
                data: { email: email, token: token },
            })
        }
        else {
            return res.json({
                message: "Wrong password",
                status: 500,
                data: {},
            })
        }
    }
    catch (e) {
        return res.json({
            message: "Log in failed",
            status: 500,
            data: { detail: e },
        })


    }
}

module.exports = { signUp, logIn }