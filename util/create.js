db = connect('mongodb://localhost/db1');

db.badge.insertMany([
    {
        title: '',
        description: ''
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
