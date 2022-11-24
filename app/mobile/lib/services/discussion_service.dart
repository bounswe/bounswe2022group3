import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class DiscussionService {
  Future postDiscussion({
    required String body,
  }) async {
    await Future.delayed(const Duration(seconds: 1));
    return true;
  }
}
