import { validationResult } from 'express-validator'

export const register =  ('/register', (req, res) => {
    console.log(req.body);
        res.json({ok:"register"})
    })

export const login =(req, res) => {
    res.json({ok:"login"})}