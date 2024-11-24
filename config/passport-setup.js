const passport = require('passport') ;
const GoogleStrategy = require('passport-google-oauth20') ;
const User = require('../models/User') ;


passport.serializeUser((user,done) => {
    done(null,user.id) ;
})

passport.deserializeUser(async (id,done) => {
    const user = await User.findById(id).exec() ;
    done(null, user) ;
})

passport.use(new GoogleStrategy({
    // options
   clientID : process.env.GOOGLE_STRATEGY_CLIENT_ID,
   clientSecret: process.env.GOOGLE_STRATEGY_CLIENT_SECRET,
   callbackURL: `${process.env.BASE_URL}/auth/google/redirect`
},  async (accessToken, refreshToken, profile, done) => {
    // Here you handle the user's information
    const found = await User.findOne({googleId : profile.id}) ;
    if(found) {
      console.log('found' , found) ;
      done(null,found) ;
    }
    else {
    const created = await User.create({
        username: profile.displayName,
        googleId: profile.id
    }) ;
    console.log("user created : ",created) ;
    done(null,created) ;
    }
    
})
)