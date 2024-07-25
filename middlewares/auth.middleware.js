const asyncHandler = require("./asyncHandler.middleware");

const jwt = require("jsonwebtoken");

const isLoggedIn = asyncHandler( async (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Please login to access this resource"
        });
    }

    const tokenDetails = jwt.verify(token,process.env.JWT_SECRET);

    if(!tokenDetails){
        return res.status(400).json({
            success: false,
            message: "Please login to access this resource"
        });
    }

    req.user = tokenDetails;
    next();
});

module.exports = isLoggedIn;