// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'activity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Activity _$ActivityFromJson(Map<String, dynamic> json) => Activity(
      json['_id'] as String,
      json['body'] as String,
      DateTime.parse(json['createdAt'] as String),
      DateTime.parse(json['updatedAt'] as String),
      json['resource'] as String?,
      json['space'] as String?,
      json['topic'] as String?,
      json['discussion'] as String?,
      User.fromJson(json['user'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ActivityToJson(Activity instance) => <String, dynamic>{
      '_id': instance.id,
      'space': instance.spaceId,
      'topic': instance.topicId,
      'resource': instance.resourceId,
      'discussion': instance.discussionId,
      'body': instance.body,
      'user': instance.user,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };
