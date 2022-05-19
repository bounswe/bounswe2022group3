const crypto = require("crypto");
const UserModel = require("../../models/users/users.model");
const { encryptPassword } = require("../../services/password");

const UserController = {
    register: async function (req, res) {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // check if user already exist
        const oldUser = await UserModel.getUserByEmail(email);

        if (oldUser) {
            return res
                .status(409)
                .json({ message: "User Already Exists. Please Login" });
        }

        //Encrypt user password
        const salt = crypto.randomBytes(128).toString("hex");
        const encryptedPassword = encryptPassword(password, salt);

        // Create user in our database
        const user = await UserModel.createUser(
            first_name,
            last_name,
            email,
            encryptedPassword,
            salt
        );

        if (user) {
            res.status(200).json({
                message: "User was created successfully.",
            });
        }
        res.status(500).json({
            message: "Could not create the user",
        });
    },
};

module.exports = UserController;
