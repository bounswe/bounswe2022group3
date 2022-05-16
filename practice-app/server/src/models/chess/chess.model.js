
const ChessModel = {
    createGame: async function (game_id, color) {
        // TO-DO: insert game data to DB
        return {
            game_id,
            color,
        };
    },
};

module.exports = ChessModel;
