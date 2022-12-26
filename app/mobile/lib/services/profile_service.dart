// ignore_for_file: non_constant_identifier_names

import 'package:bucademy/classes/profile/profile.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class ProfileService {
  Future<Profile?> getProfileInfo(String user_id) async {
    try {
      Response response =
          await dioService.dio.get('/userProfile/getProfile/$user_id');
      if (response.statusCode != 200) {
        return null;
      }
      Map json = response.data;
      Profile p = Profile.fromJson(json['profile']);
      return p;
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<void> editProfile(Profile p) async {
    var params = p.toJson();
    try {
      Response response =
          await dioService.dio.post('/userProfile/editProfile', data: params);
      if (response.statusCode != 200) {
        print(response.statusMessage);
        return;
      }
    } catch (e) {
      print(e);
    }
    return;
  }

  Future<bool> follow(String userId) async {
    try {
      Response response = await dioService.dio
          .post('/userProfile/follow', data: {'user_id': userId});
      if (response.statusCode != 200) {
        print(response.statusMessage);
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
    return true;
  }

  Future<bool> unfollow(String userId) async {
    try {
      Response response = await dioService.dio
          .post('/userProfile/unfollow', data: {'user_id': userId});
      if (response.statusCode != 200) {
        print(response.statusMessage);
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
    return true;
  }
}
