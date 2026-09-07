import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: "mysql",
    }
);

export const startDB = async () => {
        try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    }
};