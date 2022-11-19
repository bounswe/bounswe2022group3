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

db = connectDB();

var ids_d = {'badge': [ObjectId()]}; // creating an ID for the first badge
db.badge.insertMany([
    {
        _id: ids_d.badge[0], // using the generated ID as the first badge's ID
        title: 'Enrolled in a course!',
        description: 'You have been given this badge because you enrolled in a course.'
    }
]);
db.chapter.insertMany([
    {
        chapter_name: '',
        chapter_id: '',
        chapter_badge: '', // badge ref
        content: [''], // content ref
    }
]);
db.comment.insertMany([
    {
        user: '', // user ref
        comment_body: '',
        comment_date: '',
        comment_files: ['']
    }
]);
db.content.insertMany([
    {
        name: '',
        body: '',
        media: [''],
        discussion: '', // discussion ref
        video: ''
    }
]);
db.course.insertMany([
    {
        name: '',
        lecturer: '', // user ref
        info: '',
        rating: 0,
        chapters: [''], // chapter ref
        tags: [''],
        badges: [''], // badge ref
        feedback: [''], // feedback ref
        event_list: [''], // event ref
        discussion_list: [''], // discussion ref
        poll_list: [''], // poll ref
        enrollments: [''], // enrollment ref
        image: '',
    }
]);
db.discussion.insertMany([
    {
        user: '', // user ref
        course: '', // course ref
        comments: [''], // comment ref
        discussion_body: '',
        discussion_date: '',
        discussion_files: ['']
    }
]);
db.enrollment.insertMany([
    {
        user: '', // user ref
        course: '', // course ref
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
        password_hash: '',
        password_salt: '',
        password_iter: '',
        tokens: '', // token ref
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
