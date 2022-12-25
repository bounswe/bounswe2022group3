const EventModel = require("../../models/event/event.model");
const ActivityModel = require("../../models/activity/activity.model");
const UserModel = require("../../models/user/user.model");
const SpaceModel = require("../../models/space/space.model");
const EventController = {
    createEvent: async function (req, res) {
        try {
            req.body.creator = req.auth.id
            const event = await EventModel.createEvent(req.body);
            const user = await UserModel.User.findById(req.auth.id);
            const space = await SpaceModel.Space.findById(req.body.space_id);  
            // {user} launched a new event called {event.name} in {space} space, {date.now-event.createdAt} ago.
            let activity_body = `${user.name} ${user.surname} launched a new event called "${event.event_title}" in [${space.name}](https://bucademy.tk/my/spaces/${space._id}/events) space, {timeDiff}.`;
            let activity_data = {
                body : activity_body,
                space: space._id,
                event: event._id
            }
            const activity = await ActivityModel.createActivity(req.auth.id, activity_data);
            return res.status(201).json({event})
        } catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    },
    deleteEvent: async function (req, res) {
        try {
            const event_id = req.params.id
            const event = await EventModel.getEvent(event_id)
            if (!event) {
                return res.status(404).json({message: "Event does not exist"})
            }
            if (event.creator.toString() != req.auth.id.toString()) {
                return res.status(400).json({message: "User is not the creator of the event"})
            }else{
                const space = await SpaceModel.getSpaceByID(event.space_id)
                space.events.remove(id)
                await space.save()
                await EventModel.deleteEvent(event_id)
            }
            return res.status(200).json({message: "event deleted"})
        } catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    },
    updateEvent: async function (req, res) {
        try {
            const event_id = req.params.id
            let event = await EventModel.getEvent(event_id)
            if (!event) {
                return res.status(404).json({message:"Event does not exist"})
            }
            if (event.creator.toString() != req.auth.id.toString()) {
                return res.status(400).json({message:"User is not the creator of the event"})
            }
            await EventModel.updateEvent(event_id, req.body)
            event = await EventModel.getEvent(event_id)
            return res.status(200).json({event})
        } catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    },
    getEvent: async function (req, res) {
        try {
            const event = await EventModel.getPopulatedEvent(req.params.id)
            if (!event) {
                return res.status(404).json({message: "Event not found"})

            }
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
                return res.status(404).json({ message: "Event does not exist" });
            }

            if (!event.participants.includes(user)) {
                if (event.quota && event.quota <= event.participants.length) {
                    return res.status(400).json({ message: "Quota is full, cannot participate"})
                }
                event.participant_count += 1
                event.participants.push(user)
            }

            await event.save()
            return res.status(200).json({ message: "User participates in event"})
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
                const event = await EventModel.getEvent(event_id)
                event.participants.remove(user)
                event.participant_count -= 1
                await event.save()
            }
            return res.status(200).json({ message: "User removed from participation list."})
        }
        catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    }
}

module.exports = EventController;
