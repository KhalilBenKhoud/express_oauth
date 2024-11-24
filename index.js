require('dotenv').config() ;
const express = require('express') ;
const authRouter = require('./routes/authRouter') ;
const profileRouter = require('./routes/profileRouter') ;
const connectDB = require('./config/dbConnection')
const passportSetup = require('./config/passport-setup') ;
const mongoose = require('mongoose') ;
const cookieSession = require('cookie-session') ;
const passport = require('passport');

const app = express() ;

app.set('view engine','ejs') ;

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize()) ;
app.use(passport.session()) ;


app.use('/profile',profileRouter)
app.use('/auth',authRouter)

app.get('/',(req,res) => {
    res.render('home') ;
})


connectDB() ;

mongoose.connection.once('open', () => {
    app.listen(3500,() => console.log('listening on port 3500')) ;
})

