import { body, param } from "express-validator";

export const createArticleTagValidation = [
    body("article_id").isInt().withMessage("article_id debe ser entero"),
    body("tag_id").isInt().withMessage("tag_id debe ser entero"),
];

export const idParamValidation = [
    param("articleTagId").isInt().withMessage("articleTagId debe ser entero"),
];