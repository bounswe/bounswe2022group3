const mongoose = require("mongoose");
const PersonalInfoModel = require("../../models/personalInfo/personalInfo.model");

const geoLocation = new mongoose.Schema(
    {
        latitude: String,
    }
)
const eventSchema = new mongoose.Schema(
    {
        space_id: { type: mongoose.Schema.Types.ObjectId, ref: "Space", required: true },
        event_title: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: Date,
        description: { type: String, required: true },
        location: { type: geoLocation, required: true },
        quota: Number,
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

        // Following fields can be added later or removed completely. 
        // online_meeting_link: String,
        // fee: Number,
        // in_person: Boolean,
        // is_private: Boolean,
        // event_status: String,
    }
);

const Event = mongoose.model("Event", eventSchema);

const createEvent = async (body) => {
    var event = new Event(body)
    event.participants = []
    return await event.save()
};

module.exports = {
    Event,
    createEvent,
};
