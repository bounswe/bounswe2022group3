// ignore_for_file: non_constant_identifier_names

import 'package:bucademy/classes/annotation/annotation.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class AnnotationService {
  Future<bool> create(Annotation annotation) async {
    try {
      var req = annotation.toJson();
      print(req);
      Response response = await dioService.dio.post('/annotation', data: req);

      if (response.statusCode! >= 200) {
        return true;
      }
    } catch (e) {
      print(e);
    }
    return false;
  }

  Future<Annotation?> getOne(String annotation_id) async {
    try {
      Response response =
          await dioService.dio.get('/annotation/getOne/$annotation_id');
      if (response.statusCode != 200) {
        return null;
      }
      Map json = response.data;
      Annotation a = Annotation.fromJson(json['annotation']);
      return a;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<List<Annotation>> getAll(String resource_id) async {
    try {
      Response response =
          await dioService.dio.get('/annotation/get/$resource_id');
      if (response.statusCode != 200) {
        return [];
      }
      Map json = response.data;
      List<Annotation> all = json['annotations']
          .map<Annotation>((e) => Annotation.fromJson(e))
          .toList();
      return all;
    } catch (e) {
      print(e);
    }
    return [];
  }

  Future<bool> delete(String annotation_id) async {
    try {
      Response response = await dioService.dio.delete(
        '/annotation/delete',
        data: {'id': annotation_id},
      );
      if (response.statusCode == 200) {
        return true;
      }
      return false;
    } catch (e) {
      print(e);
    }
    return false;
  }

  Future<bool> update(Annotation annotation) async {
    try {
      var req = annotation.toJson();
      print(req);
      Response response =
          await dioService.dio.post('/annotation/update', data: req);

      if (response.statusCode! >= 200) {
        return true;
      }
    } catch (e) {
      print(e);
    }
    return false;
  }
}
