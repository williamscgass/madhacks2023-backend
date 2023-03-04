module.exports.check_logged_in = function(req, res, next) {
    console.log('checking.');
    console.log(req.session);
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/');
    }
}