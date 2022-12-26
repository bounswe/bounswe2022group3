// ignore_for_file: non_constant_identifier_names

import 'dart:io';

import 'package:bucademy/classes/profile/profile.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import 'package:http_parser/http_parser.dart';

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

  Future<bool> editProfile(String? bio, String? name, String? surname,
      List<String>? interests, List<String>? knowledge, bool isPrivate) async {
    var params = {
      'name': name,
      'bio': bio,
      'surname': surname,
      'interests': interests,
      'isPrivate': isPrivate,
      'knowledge': knowledge
    };
    try {
      Response response =
          await dioService.dio.post('/userProfile/updateProfile', data: params);
      if (response.statusCode == null ||
          response.statusCode! < 200 ||
          response.statusCode! > 210) {
        print(response.statusMessage);
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
    return true;
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

  Future<List<String>?> getTags() async {
    try {
      Response response = await dioService.dio.get('/userProfile/getTags');
      if (response.statusCode != 200) {
        print(response.statusMessage);
        return null;
      }
      List<String> list =
          response.data['words'].map<String>((e) => e.toString()).toList();
      return list;
    } catch (e) {
      print(e);
      return null;
    }
  }
}
