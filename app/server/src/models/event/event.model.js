const mongoose = require("mongoose");
const SpaceModel = require("../../models/space/space.model");

const geoLocation = new mongoose.Schema(
    {
        latitude: Number,
        longitude: Number,
    }
)
const eventSchema = new mongoose.Schema(
    {
        creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        space_id: { type: mongoose.Schema.Types.ObjectId, ref: "Space", required: true },
        event_title: { type: String, required: true },
        start_date: { type: Date, required: true },
        end_date: Date,
        description: { type: String, required: true },
        location: { type: geoLocation, required: true },
        quota: Number,
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        participant_count: Number

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
    event.participant_count = 0

    const space = await SpaceModel.getSpaceByID(body.space_id)
    space.events.push(event._id);
    await space.save()

    return await event.save()
};
const deleteEvent = async (id) => {
    const event = await Event.findOneAndDelete({ id });

    const space = await SpaceModel.getSpaceByID(event.space_id)
    space.events.remove(id)
    await space.save()
};

const getEvent = async (id) => {
    return await Event.findById(id).exec();
};

const updateEvent = async (id, body) => {
    return await Event.findOneAndUpdate({_id: id}, body).exec()
};

const getPopulatedEvent = async (id) => {
    return Event.findById(id)
        .populate({
            path: "space_id",
            select: { name: 1, info: 1 }
        })
        .populate({
            path: "creator",
            select: { name: 1, surname: 1, image: 1 }
        })
        .populate({
            path: "participants",
            select: { name: 1, surname: 1 }
        })
        .exec();
};

module.exports = {
    Event,
    createEvent,
    deleteEvent,
    getEvent,
    getPopulatedEvent,
    updateEvent
};
