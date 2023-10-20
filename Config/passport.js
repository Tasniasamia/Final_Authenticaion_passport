const passport = require('passport');
const userSchema = require('../Modules/userSchema');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;

passport.use(new LocalStrategy({
  usernameField: 'email', // Specify the field that holds the email address
  passwordField: 'password', // Specify the field that holds the password
}, async (email, password, done) => {
  try {
    const user = await userSchema.findOne({ email: email });
    console.log("user",user)
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
