// ignore_for_file: non_constant_identifier_names

import 'package:bucademy/classes/feed/activity.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class FeedService {
  Future<List<Activity>> getFeed() async {
    try {
      Response response = await dioService.dio.get('/activity/getFeed/');

      Map json = response.data;
      List<Activity> activities =
          json['feed'].map<Activity>((a) => Activity.fromJson(a)).toList();
      activities.sort(((a, b) => b.updatedAt.compareTo(a.updatedAt)));
      return activities;
    } catch (e) {
      print(e);
    }
    return [];
  }
}
