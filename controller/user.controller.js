const models = require("../models");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { where } = require("sequelize");

const cookieOptions = {
    secure: true,
    maxAge: 7*24*60*60*1000,
    httpOnly: true
};

const register = asyncHandler( async (req,res,_next) => {
    const { username, email, password } = req.body;
    
    if(!username || !email || !password){
        res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    

    const user = {
        username,
        email,
        password: hashedPassword
    }


     models.User.create(user)
        .then(result => {
            res.status(201).json({
            success: true,
            message: "User added successfully",
            data: user
            })
        })
        .catch(error => {
            res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error
                    
            })
        })

    
})

const login = asyncHandler( async (req,res,next) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({
            success: false,
            message: "Email and Password is required "
        })
    }

    await models.User.findOne({where: {email}})
        .then(user => {
            if(!user){
                res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                })
            }
            else{
                bcryptjs.compare(password,user.password,function(err,result){
                    if(result){
                        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{expiresIn: '7d'});

                        res.cookie('token',token,cookieOptions);

                        if(!token){
                            res.status(500).json({
                            success: false,
                            message: "Something Went Wrong"
                            })
                        }

                        res.status(200).json({
                            success: true,
                            message: "Login in Successufully",
                            token
                        })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "Something went wrong"

            })
        })
})


const getProfile = asyncHandler( async (req,res,_next) => {
    await models.User.findByPk(req.user.id,{
        attributes:{exclude: ['password']}
    })
        .then(user => {
            if(!user){
                res.status(400).json({
                    success: false,
                    message: "User not Found"
                })
            }
        
        
            res.status(200).json({
                success: true,
                data: user
            })
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error

            })
        })
    
})

module.exports = {
    register,
    login,
    getProfile
}