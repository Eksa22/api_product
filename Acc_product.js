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
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        is_acc: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        acc_date: {
            type: DataTypes.DATE,
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