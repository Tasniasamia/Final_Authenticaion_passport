const express = require("express");
const {
  homeroute,
  visitResister,
  visitlogin,
  createUser,
  checkresister,
  loginUser,
  profile,
} = require("../Controller/user.controller");
const route = express.Router();
const passport = require("passport");
route.use(passport.initialize());
route.use(passport.session());
route.get("/", homeroute);
route.get("/resister", visitResister);
route.post("/resister", createUser); // Change the path to '/resister' for POST request
route.get("/login", visitlogin);
route.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    successRedirect: "/user/profile",
  })
);
// route.post('/login',
//   passport.authenticate('local', { failureRedirect:'/user/login',successRedirect: '/user/profile'
// }),
//   function(req, res) {
//     res.redirect('/');
//   });
route.get("/profile", profile);

module.exports = route;
