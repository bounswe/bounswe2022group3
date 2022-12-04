const EventModel = require("../../models/event/event.model");
const SpaceModel = require("../../models/space/space.model");

const EventController = {
    createEvent: async function (req, res) {
        try {
            req.body.creator = req.auth.id
            const event = await EventModel.createEvent(req.body)
            return res.status(201).json(event)
        } catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    },
    deleteEvent: async function (req, res) {
        try {
            const event_id = req.params.id
            const event = await EventModel.getEvent(event_id)
            if (!event) {
                return res.status(404).json("Event does not exist")
            }
            if (event.creator.toString() != req.auth.id.toString()) {
                return res.status(400).json("User is not the creator of the event")
            }
            await EventModel.deleteEvent(event_id)
            return res.status(200).json("event deleted")
        } catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    },
    getEvent: async function (req, res) {
        try {
            const event = await EventModel.getPopulatedEvent(req.params.id)
            let participating = event.participants.includes(req.auth.id) ? true : false
            return res.status(200).json({ event, participating })
        } catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    },
    participateToEvent: async function (req, res) {
        try {
            const event_id = req.params.event_id
            const user = req.auth.id
            var event = await EventModel.Event.findById(event_id);
            if (!event) {
                return res.status(404).json({ error: "Event does not exist" });
            }

            if (!event.participants.includes(user)) {
                if (event.quota && event.quota <= event.participants.length) {
                    return res.status(400).json("Quota is full, cannot participate")
                }
                event.participant_count += 1
                event.participants.push(user)
            }

            await event.save()
            return res.status(200).json("User participates in event")
        }
        catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    },
    unparticipateToEvent: async function (req, res) {
        try {
            const event_id = req.params.event_id
            const user = req.auth.id
            var event = await EventModel.Event.findById(event_id);
            if (!event) {
                return res.status(404).json({ error: "Event does not exist" });
            }

            if (event.participants.includes(user)) {
                event.participants.pop(user)
                event.participant_count -= 1
            }
            await event.save()
            return res.status(200).json("User does not participate in event")
        }
        catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    }
}

module.exports = EventController;
