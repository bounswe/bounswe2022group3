import 'package:injectable/injectable.dart';

class Course {
  String title;
  String body;
  String? image;
  double? rating;
  String? teacher;

  Course(this.title, this.body, {this.image, this.rating, this.teacher});
}

@lazySingleton
class CourseService {
  List<Course> courses() {
    return [
      for (var i = 0; i < 100; ++i)
        Course("Introduction to Data Science with Python",
            "Interested in learning more about data science, but don’t know where to start?" * 10,
            image: 'https://cdn.educba.com/academy/wp-content/uploads/2019/03/Introduction-To-Data-Science.jpg.webp',
            teacher: "Andrew mg",
            rating: 4.3)
    ];
  }
}
