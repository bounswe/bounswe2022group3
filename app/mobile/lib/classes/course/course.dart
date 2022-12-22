import 'dart:math';

import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/classes/note/note.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

part 'course.g.dart';

@JsonSerializable()
class Course {
  final String name;
  @JsonKey(name: '_id')
  final String id;
  final String info;
  final List<String> tags;
  final String image;
  final User creator;
  final double rating = Random().nextInt(20) / 10 + 3;
  @JsonKey(name: 'enrolledUsersCount')
  final int numberOfEnrolled;
  final Color color = CustomColors.getRandomColor();
  // final DateTime createdAt;

  Course(this.name, this.id, this.info, this.tags, this.image, this.creator, this.numberOfEnrolled);

  factory Course.fromJson(Map<String, dynamic> json) => _$CourseFromJson(json);

  Map<String, dynamic> toJson() => _$CourseToJson(this);
}

@JsonSerializable()
class CourseDetailed extends Course {
  List<Topic> topics = [];
  List<String> badges = [];
  List<DiscussionShortened> discussions = [];
  List<Note>? notes = [];

  CourseDetailed(super.name, super.id, super.info, super.tags, super.image,
      super.creator, super.numberOfEnrolled, this.topics, this.badges, this.discussions, this.notes);

  factory CourseDetailed.fromJson(Map<String, dynamic> json) =>
      _$CourseDetailedFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CourseDetailedToJson(this);
}
