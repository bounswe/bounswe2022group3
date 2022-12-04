import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

class MockContent {
  String name;
  String body;
  String? space;

  MockContent(this.name, this.body, {this.space});
}

List<MockContent> mockContents = [];

@lazySingleton
class MockContentService {
  contents(String title) {
    List<MockContent> temp = [
      for (var i = 1; i <= 100; ++i)
        MockContent(
            '$title - ${i.toString()}',
            "Interested in learning more about data science, but don’t know where to start?" *
                10)
    ];
    mockContents.addAll(temp);
    if (title == "Event") {
      return [
        MockContent('Orientation', 'Mock'),
        MockContent('Introductory Meeting', 'Mock'),
        MockContent('Game Night', 'Mock'),
        MockContent('Information Sharing Meeting', 'Mock'),
        MockContent('Barbecue Weekend', 'Mock'),
        MockContent('Happy Hour', 'Mock'),
        MockContent('Online Planning Meeting', 'Mock'),
        MockContent('Weekly Meeting', 'Mock'),
        MockContent('Beer Night', 'Mock'),
      ];
    }
    return temp;
  }

  Future<TopicDetailed?> getTopicDetails({required String topicId}) async {
    try {
      Response response = await dioService.dio.get('/topic/$topicId');
      if (response.statusCode != 200) {
        return null;
      }
      TopicDetailed t = TopicDetailed.fromJson(response.data["topic"]);
      return t;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<TopicDetailed?> createNewTopic(
      {required String spaceId, required String name}) async {
    try {
      Response response = await dioService.dio
          .post('/topic', data: {'space_id': spaceId, 'name': name});
      if (response.statusCode != 201) {
        return null;
      }

      TopicDetailed t = TopicDetailed.fromJson(response.data["topic"]);
      return t;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<Resource?> createNewResource(
      {required String topicId,
      required String name,
      required String body}) async {
    try {
      Response response = await dioService.dio.post('/resource',
          data: {'topic_id': topicId, 'name': name, 'body': body});
      if(response.statusCode != 201) {
        return  null;
      }

      Resource r = Resource.fromJson(response.data["resource"]);
      return r;
    } catch (e) {
      print(e);
    }
    return null;
  }
}
