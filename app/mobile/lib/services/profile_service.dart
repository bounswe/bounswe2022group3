// ignore_for_file: non_constant_identifier_names

import 'package:bucademy/classes/profile/profile.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

class Badge {
  String title;
  String def;

  Badge(this.title, this.def);
}

@lazySingleton
class ProfileService {
  Future<Profile?> getProfileInfo(String user_id) async {
    print("in getInfo");
    try {
      Response response =
          await dioService.dio.get('/userProfile/getProfile/$user_id');
      if (response.statusCode != 200) {
        print(response.statusCode);
        return null;
      }
      Map json = response.data;
      Profile p =
          json['profile'].map<Profile>((e) => Profile.fromJson(e)).toList();
      return p;
    } catch (e) {
      print(e);
    }
    return null;
  }
}
