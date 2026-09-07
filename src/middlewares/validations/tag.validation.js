import { body, param } from "express-validator";

export const createTagValidation = [
    body("name")
    .isLength({ min: 2, max: 30 }).withMessage("name: entre 2 y 30 caracteres")
    .matches(/^\S+$/).withMessage("name: no debe contener espacios"),
];

export const updateTagValidation = [
    param("id").isInt(),
    body("name").optional().isLength({ min: 2, max: 30 }).matches(/^\S+$/),
];

export const idParamValidation = [param("id").isInt()];