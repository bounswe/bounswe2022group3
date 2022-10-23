
const BasicController = {
    getCall: async function (req, res) {

        try {
            res.send({ "status": "ok", "message": "Hello!" })
        }
        catch (e) {
            console.log("Error on getCall:", e)
            res.status(400).send({ "error": e })
        }
    },
};

module.exports = BasicController;