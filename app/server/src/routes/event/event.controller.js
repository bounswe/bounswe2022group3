const EventModel = require("../../models/event/event.model");

const EventController = {
    createEvent: async function (req, res) {
        try {
            const event = await EventModel.createEvent(req.body)
            console.log("event creation result:", event)
            return res.status(201).json(event)


            //   const { name, body, topic_id } = req.body;
            //   const user = req.auth.id;
            //   var topic = await TopicModel.Topic.findById(topic_id);
            //   if(!topic){
            //     return res.status(400).json({ error: "Topic does not exist!" });
            //   }
            //   const resource = await ResourceModel.createResource(
            //     name,
            //     body,
            //     topic_id,
            //     user
            //   );
            //   topic.resources.push(resource);
            //   topic.save();
            //   const resource_populated = await ResourceModel.getPopulatedResource(resource._id);
            //   return res.status(201).json({ resource: resource_populated });
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
                    console.log("inside.")
                    return res.status(400).json("Quota is full, cannot participate")
                }
                event.participants.push(user)
            }

            await event.save()
            return res.status(200).json("User participates in event")
        }
        catch (e) {
            return res.status(400).json({ error: e.toString() });
        }
    }
}

module.exports = EventController;
