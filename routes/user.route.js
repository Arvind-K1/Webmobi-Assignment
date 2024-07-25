const express = require("express");

const isLoggedIn = require("../middlewares/auth.middleware");
const { register, login, getProfile, deleteUser } = require("../controller/user.controller");

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/profile',isLoggedIn,getProfile);
router.delete('/delete',isLoggedIn,deleteUser);


module.exports = router;