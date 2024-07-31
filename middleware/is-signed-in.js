// if user exists allow the request to continue by invoking next()
// if does not exist, should be redirected to the sign in page 


const isSignedIn = (req, res, next) => {
    if (req.session.user) return next(); 
    res.redirect('/auth/sign-in');
}

module.exports = isSignedIn;