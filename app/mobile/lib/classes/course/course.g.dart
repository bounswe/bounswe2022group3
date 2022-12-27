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
      json['enrolledUsersCount'] as int,
      (json['rating'] as num).toDouble(),
    );

Map<String, dynamic> _$CourseToJson(Course instance) => <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'info': instance.info,
      'tags': instance.tags,
      'image': instance.image,
      'creator': instance.creator,
      'rating': instance.rating,
      'enrolledUsersCount': instance.numberOfEnrolled,
    };

CourseDetailed _$CourseDetailedFromJson(Map<String, dynamic> json) =>
    CourseDetailed(
      json['name'] as String,
      json['_id'] as String,
      json['info'] as String,
      (json['tags'] as List<dynamic>).map((e) => e as String).toList(),
      json['image'] as String,
      User.fromJson(json['creator'] as Map<String, dynamic>),
      json['enrolledUsersCount'] as int,
      (json['rating'] as num).toDouble(),
      (json['topics'] as List<dynamic>)
          .map((e) => Topic.fromJson(e as Map<String, dynamic>))
          .toList(),
      (json['badges'] as List<dynamic>).map((e) => e as String).toList(),
      (json['discussions'] as List<dynamic>)
          .map((e) => DiscussionShortened.fromJson(e as Map<String, dynamic>))
          .toList(),
      (json['notes'] as List<dynamic>?)
          ?.map((e) =>
              e == null ? null : Note.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$CourseDetailedToJson(CourseDetailed instance) =>
    <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'info': instance.info,
      'tags': instance.tags,
      'image': instance.image,
      'creator': instance.creator,
      'rating': instance.rating,
      'enrolledUsersCount': instance.numberOfEnrolled,
      'topics': instance.topics,
      'badges': instance.badges,
      'discussions': instance.discussions,
      'notes': instance.notes,
    };
