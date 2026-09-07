import { matchedData } from "express-validator";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { TagModel } from "../models/tag.model.js";

export const createArticle = async (req, res) => {
    try {
    const validatedData = matchedData(req, { locations: ["body"] });

    const article = await ArticleModel.create({ ...validatedData, user_id: req.user.id });

    return res.status(201).json(article);
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getAllArticles = async (req, res) => {
    try {
    const articles = await ArticleModel.findAll({
        where: { status: "published" },
        include: [
        { model: UserModel, as: "author", attributes: { exclude: ["password"] } },
        { model: TagModel, as: "tags" },
        ],
    });

    return res.status(200).json(articles);
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getArticleById = async (req, res) => {
    try {
    const { id } = matchedData(req, { locations: ["params"] });

    const article = await ArticleModel.findByPk(id, {
        include: [
        { model: UserModel, as: "author", attributes: { exclude: ["password"] } },
        { model: TagModel, as: "tags" },
        ],
    });

    if (!article) {
        return res.status(404).json({ message: "Articulo no encontrado" });
    }

    return res.status(200).json(article);
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getMyArticles = async (req, res) => {
    try {
    const articles = await ArticleModel.findAll({
        where: { user_id: req.user.id, status: "published" },
        include: [{ model: TagModel, as: "tags" }],
    });

    return res.status(200).json(articles);
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getMyArticleById = async (req, res) => {
    try {
    const { id } = matchedData(req, { locations: ["params"] });

    const article = await ArticleModel.findOne({
        where: { id, user_id: req.user.id },
        include: [{ model: TagModel, as: "tags" }],
    });

    if (!article) {
        return res.status(404).json({ message: "Articulo no encontrado" });
    }

    return res.status(200).json(article);
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateArticle = async (req, res) => {
    try {
    const validatedBody = matchedData(req, { locations: ["body"] });
    await req.article.update(validatedBody); // req.article lo carga ownerMiddleware
    return res.status(200).json({ message: "Articulo actualizado correctamente" });
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteArticle = async (req, res) => {
    try {
    await req.article.destroy(); // eliminacion logica + cascada de ArticleTag
    return res.status(200).json({ message: "Articulo eliminado correctamente" });
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};