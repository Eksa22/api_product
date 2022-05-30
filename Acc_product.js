const db = require("./db")
const { DataTypes } = require("sequelize");
const Admin = require("./Admin");
const User = require("./User");

const Acc_product = db.define(
    "acc_product",
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "user_id"
            },
        },
        admin_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: Admin,
                key: "admin_id"
            },
        },
        is_acc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        acc_date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        request_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        timestamps: false
    }
)

module.exports = Acc_product;