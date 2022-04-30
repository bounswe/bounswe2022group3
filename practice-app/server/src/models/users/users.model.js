const { db } = require("../../services/db");

const UserModel = {
    getUserByEmail: async function (email) {
        return (
            await db.query(
                `SELECT *
                FROM users
                WHERE email=$1`,
                [email]
            )
        ).rows[0];
    },
    createUser: async function (
        first_name,
        last_name,
        email,
        hashed_password,
        salt
    ) {
        return (
            await db.query(
                `INSERT INTO users 
                (first_name, last_name, email, hashed_password, salt) 
                VALUES 
                ($1, $2, $3, $4, $5)
                RETURNING *`,
                [first_name, last_name, email, hashed_password, salt]
            )
        ).rows[0];
    },
};

module.exports = UserModel;
