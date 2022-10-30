import 'dart:math';

import 'package:bucademy/classes/chapter/chapter.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'course.g.dart';

@JsonSerializable()
class Course {
  final String name;
  @JsonKey(name: '_id')
  final String id;
  final String info;
  final List<String> tags;
  final List<String> badges;
  final String image;
  final User lecturer;
  final double rating = Random().nextInt(20) / 10 + 3;
  final int numberOfEnrolled = Random().nextInt(2000) + 100;
  // final DateTime createdAt;

  Course(this.name, this.id, this.info, this.tags, this.badges, this.image, this.lecturer);

  factory Course.fromJson(Map<String, dynamic> json) => _$CourseFromJson(json);

  Map<String, dynamic> toJson() => _$CourseToJson(this);
}

@JsonSerializable()
class CourseDetailed extends Course {
  List<Chapter> chapters = [];

  CourseDetailed(
      super.name, super.id, super.info, super.tags, super.badges, super.image, super.lecturer, this.chapters);

  factory CourseDetailed.fromJson(Map<String, dynamic> json) => _$CourseDetailedFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$CourseDetailedToJson(this);
}
