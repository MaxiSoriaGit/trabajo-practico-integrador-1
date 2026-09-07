import { body } from "express-validator";

export const registerValidation = [
    body("username")
    .isLength({ min: 3, max: 20 }).withMessage("username: entre 3 y 20 caracteres")
    .isAlphanumeric().withMessage("username: debe ser alfanumerico"),
    body("email").isEmail().withMessage("email invalido"),
    body("password")
    .isLength({ min: 8 }).withMessage("password: minimo 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage("password: debe tener mayuscula, minuscula y numero"),
    body("first_name")
    .isLength({ min: 2, max: 50 }).withMessage("first_name: entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("first_name: solo letras"),
    body("last_name")
    .isLength({ min: 2, max: 50 }).withMessage("last_name: entre 2 y 50 caracteres")
    .isAlpha("es-ES", { ignore: " " }).withMessage("last_name: solo letras"),
];

export const loginValidation = [
    body("email").isEmail().withMessage("email invalido"),
    body("password").notEmpty().withMessage("password obligatoria"),
];

export const updateProfileValidation = [
    body("first_name").optional().isLength({ min: 2, max: 50 }).isAlpha("es-ES", { ignore: " " }),
    body("last_name").optional().isLength({ min: 2, max: 50 }).isAlpha("es-ES", { ignore: " " }),
    body("biography").optional().isLength({ max: 500 }),
    body("avatar_url").optional().isURL().withMessage("avatar_url: URL invalida"),
];