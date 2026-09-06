import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define(
    "Article",
    {
    title: { type: DataTypes.STRING(200), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    excerpt: { type: DataTypes.STRING(500), allowNull: true },
    status: {
        type: DataTypes.ENUM("published", "archived"),
        defaultValue: "published",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
    },
    },
    {
    tableName: "Articles",
    paranoid: true, // eliminacion logica del articulo
    }
);

// relacion 1:N
UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "articles" });
ArticleModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });