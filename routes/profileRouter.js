const router = require('express').Router() ;

const authCheck = (req,res,next) => {
    if(!req.user) {
        res.sendStatus(401) ;
    }
    else {
        next() ;
    }
}

router.get('/',authCheck, (req,res) => {
    res.send('you are logged in, this is your profile - '+ req.user.username) ;

})

module.exports = router ;