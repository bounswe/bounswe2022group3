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
      json['image'] as String,
      User.fromJson(json['creator'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$CourseToJson(Course instance) => <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'info': instance.info,
      'tags': instance.tags,
      'image': instance.image,
      'creator': instance.creator,
    };

CourseDetailed _$CourseDetailedFromJson(Map<String, dynamic> json) =>
    CourseDetailed(
      json['name'] as String,
      json['_id'] as String,
      json['info'] as String,
      (json['tags'] as List<dynamic>).map((e) => e as String).toList(),
      json['image'] as String,
      User.fromJson(json['creator'] as Map<String, dynamic>),
      (json['topics'] as List<dynamic>)
          .map((e) => Topic.fromJson(e as Map<String, dynamic>))
          .toList(),
      (json['badges'] as List<dynamic>).map((e) => e as String).toList(),
    );

Map<String, dynamic> _$CourseDetailedToJson(CourseDetailed instance) =>
    <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'info': instance.info,
      'tags': instance.tags,
      'image': instance.image,
      'creator': instance.creator,
      'topics': instance.topics,
      'badges': instance.badges,
    };
