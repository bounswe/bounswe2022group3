import 'package:injectable/injectable.dart';

class Course {
  String title;
  String body;
  String? image;
  double? rating;
  String? teacher;

  Course(this.title, this.body, {this.image, this.rating, this.teacher});
}

List<Course> mockCourses = [
  for (var i = 0; i < 100; ++i)
    Course('Basics of Google UI/UX Designs - ${i.toString()}',
        "Interested in learning more about data science, but don’t know where to start?" * 10,
        image: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', teacher: "Andrew mg", rating: 4.3)
];

@lazySingleton
class CourseService {
  courses() => mockCourses;

  Future<List<Course>> searchCourse(String keyword) async {
    await Future.delayed(const Duration(milliseconds: 300));
    return mockCourses.where((element) => (element.title.contains(keyword) || element.body.contains(keyword))).toList();
  }
}
