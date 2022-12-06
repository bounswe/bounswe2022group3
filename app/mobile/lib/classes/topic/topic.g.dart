// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'topic.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Topic _$TopicFromJson(Map<String, dynamic> json) => Topic(
      json['name'] as String,
      json['_id'] as String,
      json['space'] as String,
    );

Map<String, dynamic> _$TopicToJson(Topic instance) => <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'space': instance.space,
    };

TopicDetailed _$TopicDetailedFromJson(Map<String, dynamic> json) =>
    TopicDetailed(
      json['name'] as String,
      json['_id'] as String,
      json['space'] as String,
      User.fromJson(json['creator'] as Map<String, dynamic>),
      (json['resources'] as List<dynamic>)
          .map((e) => Resource.fromJson(e as Map<String, dynamic>))
          .toList(),
      json['createdAt'] as String,
      json['updatedAt'] as String,
    );

Map<String, dynamic> _$TopicDetailedToJson(TopicDetailed instance) =>
    <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'space': instance.space,
      'creator': instance.creator,
      'resources': instance.resources,
      'createdAt': instance.createdAt,
      'updatedAt': instance.updatedAt,
    };
