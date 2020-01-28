module.exports = (req, res, next) => {
  if(!req.user) {
    var error = new Error('User is not logged in')
    error.status = 401;
    next(error)
    //throw new Error(error)
  }
  next();
};
