import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";

export const ArticleTagModel = sequelize.define(
    "ArticleTag",
    {
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Articles", key: "id" },
        onDelete: "CASCADE", // si el articulo se borra de verdad, desaparecen sus vinculos
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Tags", key: "id" },
        onDelete: "CASCADE", // si la etiqueta se borra de verdad, desaparecen sus vinculos
    },
    },
    {
    tableName: "ArticlesTags",
    indexes: [
        {
        unique: true,
        fields: ["article_id", "tag_id"], // impide que un articulo tenga la misma etiqueta dos veces
        },
    ],
    }
);

// relacion N:M
ArticleModel.belongsToMany(TagModel, {
    through: ArticleTagModel,
    foreignKey: "article_id",
    as: "tags",
});
TagModel.belongsToMany(ArticleModel, {
    through: ArticleTagModel,
    foreignKey: "tag_id",
    as: "articles",
});

// No hace falta beforeDestroy:
// - Article es paranoid, destroy() solo pone deletedAt y el vinculo sigue siendo valido
// - si el articulo llega a borrarse fisicamente, el CASCADE lo resuelve la base de datos
