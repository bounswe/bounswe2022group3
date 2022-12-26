const SpaceModel = require("../../models/space/space.model");
const EnrollmentModel = require("../../models/enrollment/enrollment.model");
const UserModel = require("../../models/user/user.model");
const ActivityModel = require("../../models/activity/activity.model");

const EnrollmentController = {
  createEnrollment: async function (req, res) {
    try {
      const space_id = req.body.space_id;
      const user_id = req.auth.id;
      const space = await SpaceModel.Space.findById(space_id);
      if (!space) {
        return res.status(400).json({ error: "Space does not exist!" });
      }
      const enrolled_space = await EnrollmentModel.Enrollment.find({
        user: user_id,
        space: space_id,
      });
      if (enrolled_space.length > 0) {
        return res.status(400).json({ error: "User already enrolled!" });
      }
      const enrollment = await EnrollmentModel.createEnrollment(user_id, space_id);
      space.enrollments.push(enrollment._id);
      space.enrolledUsersCount += 1;
      await space.save();
      const user = await UserModel.User.findById(user_id);
      // {user} enrolled to {space} space, {date.now-enrollment.createdAt} ago.
      let activity_body = `${user.name} ${user.surname} enrolled to "${space.name}" space, {timeDiff}.`;
      let activity_data = {
        body : activity_body,
        space: space._id,
        type: "enrollment",
      }
      const activity = await ActivityModel.createActivity(user, activity_data);
      
      return res.status(201).send({ enrollment });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },

  getEnrollment: async function (req, res) {
    try {
      var enrollment_id = req.params.id;
      const user = req.auth.id;
      var enrollment = await EnrollmentModel.getEnrollmentByID(enrollment_id);
      if (!enrollment) {
        return res.status(404).json({ message: "The enrollment does not exist!" }); // The token exists but email mismatch.
      }
      if (enrollment.user.toString() !== user.toString()) {
        return res
          .status(400)
          .send({ error: "User not the creator of the enrollment!" });
      }
      return res.status(201).send({ enrollment });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
    }
  },
  searchEnrollments: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      const user = req.auth.id;
      var enrollments = [];
      if (keyword) {
        spaces = await SpaceModel.Space.find(
          {
            name: { $regex: keyword, $options: "i" },
          },
          "name creator info rating tags image enrolledUsersCount"
        )
          .populate("creator", "name surname")
          .exec();
        for (var space of spaces) {
          var enr = await EnrollmentModel.Enrollment.find(
            {
              space,
              user,
            },
            "space is_active notes progress"
          ).exec();
          if (enr) {
            enrollments.push(enr);
          }
        }
      } else {
        enrollments = await EnrollmentModel.Enrollment.find(
          { user },
          "space is_active notes progress"
        ).exec();
      }
      return res.status(200).json({ enrollments });
    } catch (error) {
      return res.status(400).send({ error: error.toString() });
    }
  },

  getEnrolledSpaces: async function (req, res) {
    try {
      const keyword = req.params.keyword;
      const user = req.auth.id;
      var enrollments = [];
      if (keyword) {
        let spaces = await SpaceModel.Space.find(
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
          if (spaces.length < 1) {
            spaces = await searchWithLabels(keyword)
          }
    
          // if still not found, do semantic search
          if (spaces.length < 1) {
            spaces = await semanticSearch(keyword)
          }
        for (var space of spaces) {
          var enr = await EnrollmentModel.Enrollment.find(
            {
              space,
              user,
            },
            "space is_active notes progress"
          ).exec();
          if (enr.length > 0) {
            enrollments.push(space);
          }
        }
      }
      else {
        const enrolled_spaces = await EnrollmentModel.Enrollment.find({
          user,
        });
        for (var enrolled_space of enrolled_spaces) {
          var space = await SpaceModel.Space.find({
            _id: enrolled_space.space
          },
            "name creator info rating tags image enrolledUsersCount"
          ).populate({
            path: "creator",
            select: { _id: 1, name: 1, surname: 1, image: 1 }
          })
          if (space) {
            enrollments.push(space[0]);
          }
        }
        // const creator = await UserModel.User.findById(user);
        // for (var space of creator.created_spaces) {
        //   var populated_space = await SpaceModel.Space.findOne({
        //     _id: space
        //   },
        //     "name creator info rating tags image enrolledUsersCount"
        //   ).populate({
        //     path: "creator",
        //     select: { _id: 1, name: 1, surname: 1, image: 1 }
        //   });
        //   enrollments.push(populated_space);
        // }
      }
      return res.status(200).json({ enrollments });
    } catch (e) {
      return res.status(400).send({ error: e.toString() });
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

  const titleRelevances = (await axios.post(`${semanticUrl}/relevance`, titlePayload, { headers: { "Accept-Encoding": "*" } })).data.relevances
  const infoRelevances = (await axios.post(`${semanticUrl}/relevance`, infoPayload, { headers: { "Accept-Encoding": "*" } })).data.relevances

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

module.exports = EnrollmentController;
