const templates = {
    confirmationEmail: function ({ first_name, last_name, token }) {
        return (
            "Hello " +
            first_name +
            " " +
            last_name +
            ",\n\n" +
            "Please verify your account by clicking the link: \n" +
            process.env.FRONTEND_URL +
            "/confirmation/" +
            token +
            "\n\nThank You!\n"
        );
    },
};

module.exports = { templates };
