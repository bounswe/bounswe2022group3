const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");
const UserModel = require("../../models/user/user.model");
const ActivityModel = require("../../models/activity/activity.model");
const PersonalInfoModel = require("../../models/personalInfo/personalInfo.model");
const TopicModel = require("../../models/topic/topic.model");
const EventModel = require("../../models/event/event.model");
const DiscussionModel = require("../../models/discussion/discussion.model");
const axios = require("axios"); 
const semanticUrl = process.env.SEMANTIC_SEARCH_SERVER_URL

const SpaceController = {
  createSpace: async function (req, res) {
    try {
      const user_id = req.auth.id;
      const creator = await UserModel.getUserByID(user_id);
      console.log(creator);
      const { name, info, tags, image } = req.body;
      var space = await SpaceModel.createSpace(
        name,
        creator,
        info,
        tags,
        image
      );
      // {user} created a new space called {space.name}, {date.now-space.createdAt} ago.
      let activity_body = `${creator.name} ${creator.surname} created a new space called "${space.name}", {timeDiff}.`;
      let activity_data = {
        body : activity_body,
        space: space._id,
        type: "space"
      }
      const activity = await ActivityModel.createActivity(user_id, activity_data);
      return res.status(201).send({ space });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  },
  deleteSpace: async function (req, res) {
    try {
      const {space_id} = req.body;
      const user_id = req.auth.id;
      const space = await SpaceModel.Space.findById(space_id);
      if(!space){
        return res.status(400).json({ error: "Space does not exist!" });
      }
      if (space.creator.toString() !== user_id.toString()) {
        return res.status(401).send({ error: "Unauthorized" });
      }else {
        for (var topic_temp of space.topics) {
          await TopicModel.deleteTopic(topic_temp);
        }
        for (var event_temp of space.events) {
          await EventModel.deleteEvent(event_temp);
        }
        for (var discussion_temp of space.discussions) {
          await DiscussionModel.deleteDiscussion(discussion_temp);
        }
        for (var enrollment_temp of space.enrollments) {
          await EnrollmentModel.deleteEnrollment(enrollment_temp);
        }
        await SpaceModel.deleteSpace(space_id);
      }
      return res.status(201).json({ message: "Space deleted successfully!" });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  },
  searchSpaces: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      var spaces;
      if (keyword) {
        spaces = await SpaceModel.Space.find(
          {
            name: { $regex: keyword, $options: "i" },
          },
          "name creator info rating tags image enrolledUsersCount"
        )
          .populate({
            path: "creator",
            select: { _id: 1, name: 1, surname: 1, image: 1 }
          })
          .exec();
      } else {
        spaces = await SpaceModel.Space.find(
          {},
          "name creator info rating tags image enrolledUsersCount"
        )
          .populate({
            path: "creator",
            select: { _id: 1, name: 1, surname: 1, image: 1 }
          })
          .exec();
      }

      if (spaces.length < 1) {
        spaces = await searchWithLabels(keyword)
      }

      // if still not found, do semantic search
      if (spaces.length < 1) {
        spaces = await semanticSearch(keyword)
      }

      return res.status(200).json({ spaces });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  },

  getSpaceDetail: async function (req, res) {
    try {
      var space = req.params.id;
      space = await SpaceModel.getPopulatedSpace(space);
      if (!space) {
        return res.status(404).json({ message: "The space does not exist!" }); // The token exists but email mismatch.
      }
      //let data = { space };
      let enrolled;
      // if user logged-in
      if (req.auth) {
        var user = req.auth.id;
        user = await UserModel.User.findById(user);
        if (!user) {
          return res.status(400).json({ message: "The user does not exist!" });
        }
        const enrollingInfo = await EnrollmentModel.Enrollment.findOne({
          space,
          user,
        });
        if (enrollingInfo) {
          enrolled = true;
        } else {
          enrolled = false;
        }
        if (space.creator._id.toString() == user._id.toString()) {
          enrolled = true;
        }
      } else {
        return res.status(200).json({ space });
      }
      return res.status(200).json({ space, enrolled });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },

  getAllDiscussions: async function (req, res) {
    try {
      var space = req.params.id;
      space = await SpaceModel.Space.findById(space)
        .populate({
          path: "discussions",
          options: { sort: { 'createdAt': -1 } },
          populate: { path: "title _id comments" }
        })
        .populate({
          path: "discussions",
          options: { sort: { 'createdAt': -1 } },
          populate: {
            path: "user",
            select: { _id: 1, name: 1, surname: 1, image: 1 },
          },

        })
        .exec();
      if (!space) {
        return res.status(404).json({ message: "The space does not exist!" }); // The token exists but email mismatch.
      }
      var discussions = [];

      for (var discussion of space.discussions) {
        discussions.push({
          _id: discussion._id,
          title: discussion.title,
          user: discussion.user,
          createdAt: discussion.createdAt,
          updatedAt: discussion.updatedAt,
          number_of_comments: discussion.comments.length,
          comments: discussion.comments,
        });
      }
      return res.status(200).json({ discussions });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },

  getAllEvents: async function (req, res) {
    try {
      var space = req.params.id;
      space = await SpaceModel.Space.findById(space)
        .populate({
          path: "events",
          options: { sort: { 'start_date': -1 } },
          populate: { path: "creator", select: { 'name': 1, 'surname': 1, 'image': 1 } }
        })
        .exec();
      if (!space) {
        return res.status(404).json({ message: "The space does not exist!" }); // The token exists but email mismatch.
      }

      // if we need to specify, we can do that here.
      // var events = [];
      // for (var event of space.events) {
      //   events.push({
      //     title: event.event_title,
      //     description: event.description,
      //     location: event.location,
      //     event_id: event._id,
      //     quota: event.quota,
      //     start_date: start_date,
      //   });
      // }
      return res.status(200).json(space.events);
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
  rateSpace: async function (req,res) {
    try {
      const {space_id, rating} = req.body;
      const user = req.auth.id;
      var space = await SpaceModel.Space.findbyId(space_id);
      if(!space){
        return res.status(400).json({error: "Space does not exist!"});
      }
      var ratings = space.rating_map;
      var average_rating = space.rating;
      var users_rated = Array.from(ratings.keys());
      var rate_count = ratings.size;
      if(users_rated.includes(user._id.toString())){
        var old_rating = space.rating_map.get(user._id);
        space.rating_map.set(user._id, rating);
        let total_rating = average_rating * rate_count;
        var new_total_rating = total_rating - old_rating + rating;
        space.rating = new_total_rating / rate_count;
      } else{
        space.ratings.set(user._id, rating);
        let new_total_rating = average_rating * rate_count + rating;
        space.rating = new_total_rating / (rate_count + 1);
      }
      await space.save();
      let avg_rating = space.rating;
      return res.status(200).json({rating: avg_rating});
    } catch (e) {
      return res.status(400).send({error: e.toString()});
    }
  },
  getRecommendedSpaces: async function (req, res) {
    try {
      const user_id = req.auth.id;
      const user = await UserModel.User.findById(user_id);
      const personalInfo = await PersonalInfoModel.PersonalInfo.findOne({ _id: user.personal_info });
      var interests = personalInfo.interests;
      const url = "https://api.datamuse.com/words?max=10&ml=";
      var inferred_interests = [];
      for (interest_t of interests) {
        if (interest_t.includes(" ")) interest_t = interest_t.replace(" ", "+");
        var ml_url = `${url}${interest_t}`;
        const ml_result = await axios.get(ml_url);
        inferred_interests = inferred_interests.concat(ml_result.data);
      }
      inferred_interests.sort((a, b) => b.score - a.score);
      var spaces = [];
      var space_ids = [];
      for (inf_in of inferred_interests) {
        interests.push(inf_in.word);
      }
      for (interest_t of interests) {
        let spaces_t = await SpaceModel.Space.find({ $text: { $search: `\"${interest_t}\"` } })
          .limit(2)
          .exec();
        for (space_t of spaces_t) {
          if (!space_ids.includes(space_t._id.toString())) {
            let enrolled = await EnrollmentModel.Enrollment.find({ space: space_t, user });
            if (enrolled.length == 1) continue;
            spaces.push(space_t);
            space_ids.push(space_t._id.toString());
          }
        }
      }
      return res.status(200).json({ spaces });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  },
  getPopularSpaces: async function (req, res) {
    try {
      var spaces = await SpaceModel.Space.find(
        {},
        "name creator info rating tags image enrolledUsersCount"
      )
        .populate({
          path: "creator",
          select: { _id: 1, name: 1, surname: 1, image: 1 }
        })
        .sort({ enrolledUsersCount: -1 })
        .limit(5)
        .exec();
      return res.status(200).json({ spaces });
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  },
};

async function semanticSearch(searchText) {
  const spaces = await SpaceModel.Space.find(
    {},
    "name info"
  )

  let names = []
  let infos = []
  let spaceIDs = []

  for (let space of spaces) {
    names.push(space.name)
    infos.push(space.info)
    spaceIDs.push(space._id)
  }

  const titlePayload = {
    search_text: searchText,
    search_list: names
  };

  const infoPayload = {
    search_text: searchText,
    search_list: infos
  }

  const titleRelevances = (await axios.post(`${semanticUrl}/relevance`, titlePayload)).data.relevances
  const infoRelevances = (await axios.post(`${semanticUrl}/relevance`, infoPayload)).data.relevances

  const relevancesAsSeperateArrays = {
    titleRelevances,
    infoRelevances,
    spaceIDs
  }

  return await spacesWithRelevance(relevancesAsSeperateArrays)
}

async function spacesWithRelevance(relevancesAsSeperateArrays) {
  const relevancesNormalized = calculateRelevance(relevancesAsSeperateArrays)

  let spaces = []
  for (let relevance of relevancesNormalized) {

    const space = await SpaceModel.Space.findOne(
      { _id: relevance.spaceID },
      "name creator info rating tags image enrolledUsersCount"
    )
      .populate({
        path: "creator",
        select: { _id: 1, name: 1, surname: 1, image: 1 }
      })
      .exec()
    spaces.push(space)
  }

  return spaces
}

function calculateRelevance(relevancesAsSeperateArrays) {

  let relevances = []
  for (let i = 0; i < relevancesAsSeperateArrays.titleRelevances.length; i++) {
    relevances.push({
      spaceID: relevancesAsSeperateArrays.spaceIDs[i],
      titleRelevance: relevancesAsSeperateArrays.titleRelevances[i],
      infoRelevance: relevancesAsSeperateArrays.infoRelevances[i]
    })
  }

  let relevancesNormalized = []
  for (let relevanceObject of relevances) {
    relevancesNormalized.push({ spaceID: relevanceObject.spaceID, relevance: (0.3 * relevanceObject.titleRelevance) + (0.7 * relevanceObject.infoRelevance) })
  }

  relevancesNormalized = relevancesNormalized.filter(a => a.relevance > 0.25)
  relevancesNormalized.sort((a, b) => b.relevance - a.relevance)
  return relevancesNormalized
}

async function searchWithLabels(queryText) {
  tokens = queryText.split()

  searchString = ""
  for (token of tokens) {
    searchString += token + "+"
  }

  const mlUrl = `https://api.datamuse.com/words?max=10&ml=${searchString}`
  const mlResult = (await axios.get(mlUrl)).data

  inferredLabels = [queryText]
  for (res of mlResult) {
    inferredLabels.push(res.word);
  }

  let spaces = [];
  let spaceIDs = [];
  for (label of inferredLabels) {
    let spacesFound = await SpaceModel.Space.find({ $text: { $search: `\"${label}\"` } }).exec()

    for (let spaceFound of spacesFound) {
      if (!spaceIDs.includes(spaceFound._id.toString())) {
        spaces.push(spaceFound);
        spaceIDs.push(spaceFound._id.toString());
      }
    }
  }

  return spaces
}

module.exports = SpaceController;
