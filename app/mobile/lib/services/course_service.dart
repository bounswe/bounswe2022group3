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

  Future<List<Course>> getCourses() async {
    try {
      Response response = await dioService.dio.get('/space/searchSpaces');
      if (response.statusCode != 200) {
        return [];
      }
      Map json = response.data;
      List<Course> t = json['spaces'].map<Course>((e) => Course.fromJson(e)).toList();

      return t;
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<List<Course>> getEnrolledCourses() async {
    try {
      if (userService.user == null) return [];
      Response response = await dioService.dio.get('/enrollment/getEnrolledSpaces');
      if (response.statusCode != 200) {
        return [];
      }
      Map json = response.data;
      List<Course> t = json['enrollments'].map<Course>((e) => Course.fromJson(e)).toList();
      enrolledIds.addAll(t.map((e) => e.id));

      return t;
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<List<Course>> searchCourse(String keyword) async {
    try {
      Response response = await dioService.dio.get('/space/searchSpaces/$keyword');
      if (response.statusCode != 200) {
        return [];
      }
      Map json = response.data;
      List<Course> t = json['spaces'].map<Course>((e) => Course.fromJson(e)).toList();

      return t;
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<CourseDetailed?> getCourseDetails({required String id}) async {
    try {
      Response response = await dioService.dio.get('/space/$id');
      CourseDetailed c =  CourseDetailed.fromJson(response.data['space']);
      if(response.data['enrolled']) {
        c.notes = await noteService.notesOfSpace(spaceId: id);
      }
      return c;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<bool> enrollToSpace({required String spaceId}) async {
    try {
      Response response = await dioService.dio.post('/enrollment', data: {'space_id': spaceId});
      enrolledIds.add(spaceId);
      return true;
    } catch (e) {
      print(e);
    }
    return false;
  }

  Future<List<Course>> getRecommendedSpaces() async {
    try {
      Response response =
          await dioService.dio.get('/space/getRecommendedSpaces');
      return response.data['spaces']
          .map<Course>((e) => Course.fromJson(e))
          .toList();
    } catch (e) {
      print(e);
    }
    return [];
  }
  Future<List<Course>> getPopularSpaces() async {
    try {
      Response response =
          await dioService.dio.get('/space/getPopularSpaces');
      return response.data['spaces']
          .map<Course>((e) => Course.fromJson(e))
          .toList();
    } catch (e) {
      print(e);
    }
    return [];
  }
}
