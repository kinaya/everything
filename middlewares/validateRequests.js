const { check, validationResult, sanitizeParam } = require('express-validator');

const itemValidator = () => {
  return [
    check('title').not().isEmpty().trim().escape().isLength({ min: 5 }).withMessage('Title is required'),
    check('body').not().isEmpty().trim().escape().withMessage('Body is required'),
    check('visibility').isBoolean().withMessage('Visibility can only be true or false'),
    check('type').not().isEmpty().trim().escape().withMessage('Type is required'),
    check('type').isIn(['lend','public','giveaway']).withMessage('Not a valid item type'),
    check('_image').optional().isMongoId().withMessage('Not a valid image id'),
    check('coordinates').optional().isArray().withMessage('Not an array with coordinates'),
    check('coordinates[*]').optional().isNumeric().withMessage('Not valid coordinates')
  ]
}

const imageValidator = () => {
  return [
    check('fileType').not().isEmpty().withMessage('An image file is required'),
    check('fileType').isIn(['image/jpg', 'image/jpeg', 'image/png']).withMessage('FileType not supported'),
    check('fileName').not().isEmpty().trim().escape().withMessage('A fileName s required')
  ]
}

const validateImage = (req, res, next) => {
  const errors = validationResult(req)

  console.log('validateImage is run')

  errors.errors.map(error => {
    error.param = '_image'
  })

  if (errors.isEmpty()) {
    return next()
  }

  const error = new Error()
  error.status = 400
  error.name = 'BadRequestError'
  error.message = 'There where bad input in the request sent'
  error.errors = errors.errors;
  return next(error)
}

const validateInput = (req, res, next) => {

  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  const error = new Error()
  error.status = 400
  error.name = 'BadRequestError'
  error.message = 'There where bad input in the request sent'
  error.errors = errors.errors;
  return next(error)

}

const idValidator = () => {
  return [
    check('id').isMongoId()
  ]
}

const validateId = (req, res, next) => {
  const errors = validationResult(req);

  if(errors.isEmpty()) {
    return next()
  }

  const error = new Error()
  error.message = "Not a valid user id"
  error.status = 404
  next(error)

}


module.exports = {
  itemValidator,
  idValidator,
  imageValidator,
  validateImage,
  validateInput,
  validateId
}
