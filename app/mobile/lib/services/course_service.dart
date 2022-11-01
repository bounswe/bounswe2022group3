import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

class MockCourse {
  String title;
  String body;
  String? image;
  double? rating;
  String? teacher;

  MockCourse(this.title, this.body, {this.image, this.rating, this.teacher});
}

List<Course> mockCourses = [];

@lazySingleton
class CourseService {
  List<String> enrolledIds = [];
  getMockCourses(String title) {
    List<Course> temp = [
      for (var i = 0; i < 100; ++i)
        Course.fromJson({
          "name": "$title - ${i.toString()}",
          "_id": "63595b4aebf6c659ff926310",
          "info": "Interested in learning more about data science, but don’t know where to start?",
          "tags": [],
          "badges": [],
          "image": "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
          "lecturer": {
            "name": "Andrew",
            "surname": "Mg",
            "email": "andrew.mg@bucademy.com",
            "_id": "63595b4aebf6c659ff926310"
          },
        })
      // Course('$title - ${i.toString()}',
      //     "Interested in learning more about data science, but don’t know where to start?" * 10,
    ];
    mockCourses.addAll(temp);
    return temp;
  }

  Future<List<Course>> getCourses() async {
    try {
      Response response = await dioService.dio.get('/course/getCourses');
      if (response.statusCode != 200) {
        return [];
      }
      Map json = response.data;
      List<Course> t = json['courses'].map<Course>((e) => Course.fromJson(e)).toList();

      return t;
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<List<Course>> getEnrolledCourses() async {
    try {
      if (userService.user == null) return [];
      Response response = await dioService.dio.get('/enrollment/getEnrolledCourses');
      if (response.statusCode != 200) {
        return [];
      }
      Map json = response.data;
      List<Course> t = json['data'].map<Course>((e) => Course.fromJson(e)).toList();
      enrolledIds.addAll(t.map((e) => e.id));

      return t;
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<List<Course>> searchCourse(String keyword) async {
    try {
      Response response = await dioService.dio.get('/course/getCourses/$keyword');
      if (response.statusCode != 200) {
        return [];
      }
      Map json = response.data;
      List<Course> t = json['courses'].map<Course>((e) => Course.fromJson(e)).toList();

      return t;
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<CourseDetailed?> getCourseDetails({required String id}) async {
    try {
      Response response = await dioService.dio.get('/course/$id');
      return CourseDetailed.fromJson(response.data['data']['course']);
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future<bool> enrollToCourse({required String courseId}) async {
    try {
      Response response = await dioService.dio.post('/enrollment', data: {'course_id': courseId});
      enrolledIds.add(courseId);
      return true;
    } catch (e) {
      print(e);
    }
    return false;
  }
}
