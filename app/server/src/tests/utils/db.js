const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server-core");

exports.dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
};

exports.dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};
