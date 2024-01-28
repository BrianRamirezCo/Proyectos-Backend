import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import {body} from 'express-validator';
import { validationResultExpress } from '../middlewares/ValidationResultExpress.js';
const router = express.Router();

router.post('/register',[
    body('email','Incorrect email format')
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password','Password must be at least 6 characters long.').isLength({min:6}),
    body('password','Incorrect password format').custom((value,{req}) => {
        if(value !== req.body.repassword){
            throw new Error('The passwords do not match.')
        }return value
    }
    )
],
validationResultExpress,
register)

router.post('/login',[
    body('email','Incorrect email format')
    .trim()
    .isEmail()
    .normalizeEmail(),
    body('password','Password must be at least 6 characters long.').isLength({min:6})
] ,
validationResultExpress,
login)



export default router;