import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define(
  "Profile",
  {
    first_name: { type: DataTypes.STRING(50), allowNull: false },
    last_name: { type: DataTypes.STRING(50), allowNull: false },
    biography: { type: DataTypes.TEXT, allowNull: true },
    avatar_url: { type: DataTypes.STRING(255), allowNull: true },
    birth_date: { type: DataTypes.DATEONLY, allowNull: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: "Users", key: "id" },
    },
  },
  { tableName: "Profiles" }
);

// relacion 1:1
UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });