const passport = require('passport');

const router = require('express').Router() ;

router.get('/login',(req,res) => {
    res.render('login')
})

// auth with google

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}))

router.get('/google/redirect',passport.authenticate('google') ,(req,res) => {
    res.redirect('/profile/')
})


// logout

router.get('/logout',(req,res) => {
    //handle with passport
    req.logout() ;
    res.redirect('/') ;
})


module.exports = router ;