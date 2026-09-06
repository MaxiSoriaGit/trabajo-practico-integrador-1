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
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Tags", key: "id" },
    },
    },
    { tableName: "ArticlesTags" }
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

// eliminacion en cascada: al borrar un articulo se borran sus ArticleTag
ArticleModel.beforeDestroy(async (article) => {
    await ArticleTagModel.destroy({ where: { article_id: article.id } });
});