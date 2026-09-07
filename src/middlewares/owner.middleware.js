import { ArticleModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
    try {
    const { id } = req.params;
    const article = await ArticleModel.findByPk(id);

    if (!article) {
        return res.status(404).json({ message: "Articulo no encontrado" });
    }

    if (req.user.role !== "admin" && article.user_id !== req.user.id) {
        return res.status(403).json({ message: "No tenes permiso sobre este recurso" });
    }

    req.article = article;
    next();
    } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};