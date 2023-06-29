const { body, validationResult } = require('express-validator');
const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.reparisValidations = [
  body('date')
    .notEmpty()
    .withMessage('date can not be empty')
    .isDate()
    .withMessage('invalid format')
    .isAfter(new Date().toISOString())
    .withMessage('The date must be after the current date.'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('motorsNumber is mandatory')
    .isLength({ min: 8 })
    .withMessage('motorsNumber must be 8 at least 8 characters long'),
  body('description').notEmpty().withMessage('description can not be empty'),
  validateFields,
];

exports.userValidation = [
  body('name').notEmpty().withMessage('name can not be empty'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('The provided email is invalid'),
  body('password')
    .notEmpty()
    .withMessage('password can not be empty')
    .isLength({ min: 6 })
    .withMessage('The password must be at least 6 characters'),
  validateFields,
];
exports.validLogin = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .normalizeEmail()
    .isEmail()
    .withMessage('The provided email is invalid'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The password must be at least 6 characters'),
  validateFields,
];
exports.validUpdate = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .normalizeEmail()
    .isEmail()
    .withMessage('The provided email is invalid'),
  body('name').notEmpty().withMessage('name cannot be empty'),
  validateFields,
];
