import express from "express";


const userRouter = express.Router();

userRouter.get('/login',()=>{
    console.log('LOGIN')
})
userRouter.post('/register',()=>{
    console.log('REGISTER')
})

export {userRouter}