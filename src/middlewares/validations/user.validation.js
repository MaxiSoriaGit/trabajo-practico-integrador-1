import { body, param } from "express-validator";

export const createUserValidation = [
    body("username").isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
    body("role").optional().isIn(["user", "admin"]),
];

export const updateUserValidation = [
    param("id").isInt().withMessage("id debe ser entero"),
    body("username").optional().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("email").optional().isEmail(),
    body("role").optional().isIn(["user", "admin"]),
];

export const idParamValidation = [param("id").isInt().withMessage("id debe ser entero")];