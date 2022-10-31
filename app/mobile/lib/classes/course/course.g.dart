// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'course.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Course _$CourseFromJson(Map<String, dynamic> json) => Course(
      json['name'] as String,
      json['_id'] as String,
      json['info'] as String,
      (json['tags'] as List<dynamic>).map((e) => e as String).toList(),
      (json['badges'] as List<dynamic>).map((e) => e as String).toList(),
      json['image'] as String,
      User.fromJson(json['lecturer'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$CourseToJson(Course instance) => <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'info': instance.info,
      'tags': instance.tags,
      'badges': instance.badges,
      'image': instance.image,
      'lecturer': instance.lecturer,
    };

CourseDetailed _$CourseDetailedFromJson(Map<String, dynamic> json) =>
    CourseDetailed(
      json['name'] as String,
      json['_id'] as String,
      json['info'] as String,
      (json['tags'] as List<dynamic>).map((e) => e as String).toList(),
      (json['badges'] as List<dynamic>).map((e) => e as String).toList(),
      json['image'] as String,
      User.fromJson(json['lecturer'] as Map<String, dynamic>),
      (json['chapters'] as List<dynamic>)
          .map((e) => Chapter.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$CourseDetailedToJson(CourseDetailed instance) =>
    <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'info': instance.info,
      'tags': instance.tags,
      'badges': instance.badges,
      'image': instance.image,
      'lecturer': instance.lecturer,
      'chapters': instance.chapters,
    };
