require("dotenv").config();
const DB = process.env.DB;

const connectDB = async () => {
    const res = await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB Connection established");
        })
        .catch((e) => {
            console.log(e);
        });
    return res
};

const db = connectDB();

var ids_d = {'badge': [ObjectId()]}; // creating an ID for the first badge
db.badge.insertMany([
    {
        _id: ids_d.badge[0], // using the generated ID as the first badge's ID
        title: 'Enrolled in a course!',
        description: 'You have been given this badge because you enrolled in a course.'
    }
]);
db.topic.insertMany([
    {
        _id: '',
        name: '',
        badge: '', // badge ref
        resources: [''], // resource ref
    }
]);
db.comment.insertMany([
    {
        user: '', // user ref
        body: '',
        date: '',
        files: ['']
    }
]);
db.resource.insertMany([
    {
        name: '',
        body: '',
        media: [''],
        discussion: '', // discussion ref
        video: ''
    }
]);
db.space.insertMany([
    {
        name: '',
        creator: '', // user ref
        info: '',
        rating: 0,
        topics: [''], // topic ref
        tags: [''],
        badges: [''], // badge ref
        feedbacks: [''], // feedback ref
        events: [''], // event ref
        discussions: [''], // discussion ref
        polls: [''], // poll ref
        enrollments: [''], // enrollment ref
        image: '',
    }
]);
db.discussion.insertMany([
    {
        user: '', // user ref
        space: '', // space ref
        comments: [''], // comment ref
        body: '',
        date: '',
        files: ['']
    }
]);
db.enrollment.insertMany([
    {
        user: '', // user ref
        space: '', // space ref
        is_active: true,
        notes: '', // note ref
        progress: '' // bool map
    }
]);
db.personalinfo.insertMany([
    {
        bio: '',
        personal_achievements: [''],
        interest_badges_selected: [''],
        personal_activities: [''],
        knowledge: [''],
        personal_rating: '',
        interests: [''],
        badges: [''] // badge ref
    }
]);
db.token.insertMany([
    {
        email: '',
        password_hash: '',
        password_salt: '',
        password_iter: '',
        access_token: '',
        refresh_token: '',
        confirmation_token: ''
    }
]);
db.user.insertMany([
    {
        email: 'furkan.akkurt@boun.edu.tr',
        name: 'Furkan',
        surname: 'Akkurt',
        personal_info: '', // personal info ref
        enrollments: [''], // enrollment ref
        created_courses: [''], // course ref
        followed_users: [''], // user ref
        follower_users: [''], // user ref
        blocked_users: [''], // user ref
        is_confirmed: true,
        is_banned: false,
        failed_login_count: 0,
        is_private: false
    }
]);
