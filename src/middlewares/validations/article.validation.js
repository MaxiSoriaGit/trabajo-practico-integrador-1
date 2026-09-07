import { body, param } from "express-validator";

export const createArticleValidation = [
    body("title").isLength({ min: 3, max: 200 }).withMessage("title: entre 3 y 200 caracteres"),
    body("content").isLength({ min: 50 }).withMessage("content: minimo 50 caracteres"),
    body("excerpt").optional().isLength({ max: 500 }),
    body("status").optional().isIn(["published", "archived"]),
];

export const updateArticleValidation = [
    param("id").isInt(),
    body("title").optional().isLength({ min: 3, max: 200 }),
    body("content").optional().isLength({ min: 50 }),
    body("excerpt").optional().isLength({ max: 500 }),
    body("status").optional().isIn(["published", "archived"]),
];

export const idParamValidation = [param("id").isInt()];