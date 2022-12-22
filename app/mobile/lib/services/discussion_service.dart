import 'package:bucademy/classes/discussion/comment.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class DiscussionService {
  Future<Comment?> postComment({
    required String discussionId,
    required String body,
  }) async {
    try {
      if (userService.user == null) return null; // user is not logged in
      Response response = await dioService.dio.post(
        '/comment',
        data: {"discussion_id": discussionId, "comment": body},
      );

      Map json = response.data;

      Comment comment = Comment.fromJson(json['comment']);
      comment.user = userService.user!;
      return comment;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<Discussion?> getDiscussion({
    required String discussionId,
  }) async {
    try {
      Response response = await dioService.dio.get('/discussion/$discussionId');
      if (response.statusCode != 200) {
        return null;
      }
      Map json = response.data;
      Discussion discussion = Discussion.fromJson(json['discussion']);

      return discussion;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<Discussion?> createDiscussion({
    required String spaceId,
    required String title,
  }) async {
    try {
      Response response = await dioService.dio
          .post('/discussion', data: {'space_id': spaceId, 'title': title});

      Map json = response.data;
      Discussion discussion = Discussion.fromJson(json['discussion']);

      return discussion;
    } catch (e) {
      print(e);
    }
    return null;
  }
}
