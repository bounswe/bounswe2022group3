import 'package:bucademy/classes/discussion/comment.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/classes/note/note.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class NoteService {
  Future<Note?> postNote({
    required String spaceId,
    required String title,
    required String body,
  }) async {
    try {
      Response response = await dioService.dio.post(
        '/comment',
        data: {"space_id": spaceId, "title": title, "body": body},
      );

      Map json = response.data;
      return Note.fromJson(json['note']);
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<Note?> getNote({
    required String noteId,
  }) async {
    try {
      Response response = await dioService.dio.get('/note/$noteId');
      if (response.statusCode != 200) {
        return null;
      }
      Map json = response.data;
      return Note.fromJson(json['note']);
    } catch (e) {
      print(e);
    }
    return null;
  }
}
