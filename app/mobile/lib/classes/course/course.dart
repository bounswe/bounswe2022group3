import 'dart:math';

import 'package:bucademy/classes/topic/topic.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/classes/event/event.dart';
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
  final double rating;
  @JsonKey(name: 'enrolledUsersCount')
  final int numberOfEnrolled;
  final Color color = CustomColors.getRandomColor();
  // final DateTime createdAt;

  Course(this.name, this.id, this.info, this.tags, this.image, this.creator, this.numberOfEnrolled, this.rating);

  factory Course.fromJson(Map<String, dynamic> json) => _$CourseFromJson(json);

  Map<String, dynamic> toJson() => _$CourseToJson(this);
}

@JsonSerializable()
class CourseDetailed extends Course {
  List<Topic> topics = [];
  List<String> badges = [];
  List<DiscussionShortened> discussions = [];
  List<EventShortened> events = [];

  List<Note?>? notes = [];

  CourseDetailed(
      super.name,
      super.id,
      super.info,
      super.tags,
      super.image,
      super.creator,
      super.numberOfEnrolled,
      super.rating,
      this.topics,
      this.badges,
      this.discussions,
      this.events,
      this.notes);

  factory CourseDetailed.fromJson(Map<String, dynamic> json) =>
      _$CourseDetailedFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CourseDetailedToJson(this);
}
