import 'package:bucademy/classes/note/note.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class NoteService {
  Future<Note?> postNote({
    required String title,
    required String body,
    required String resourceId,
  }) async {
    try {
      Response response = await dioService.dio.post(
        '/note',
        data: {"resource_id": resourceId, "title": title, "body": body},
      );

      Map json = response.data;
      return await getNote(noteId: json['note']['_id']);
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

  Future<List<Note?>> notesOfSpace({
    required String spaceId,
  }) async {
    if (userService.user == null) {
      return []; // cannot get notes if the user is not logged in
    }
    try {
      Response response = await dioService.dio.post(
        '/note/getNoteList',
        data: {"space_id": spaceId},
      );
      Map json = response.data;
      return json['notes'].map<Note>((e) => Note.fromJson(e['note'])).toList();
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<Note?> updateNote({
    required String noteId,
    required String body,
  }) async {
    try {
      Response response = await dioService.dio.put(
        '/note/update',
        data: {"note_id": noteId, "body": body},
      );
      Map json = response.data;
      return await this.getNote(noteId: json['note']['_id']);
    } catch (e) {
      print(e);
    }
    return null;
  }
}
