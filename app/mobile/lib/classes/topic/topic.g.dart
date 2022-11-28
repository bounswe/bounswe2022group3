// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'topic.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Topic _$TopicFromJson(Map<String, dynamic> json) => Topic(
      json['chapter_name'] as String,
      json['_id'] as String,
    );

Map<String, dynamic> _$TopicToJson(Topic instance) => <String, dynamic>{
      'chapter_name': instance.name,
      '_id': instance.id,
    };

TopicDetailed _$TopicDetailedFromJson(Map<String, dynamic> json) =>
    TopicDetailed(
      json['chapter_name'] as String,
      json['_id'] as String,
      json['chapter_badge'] as Map<String, dynamic>,
      json['chapter_id'] as String,
      (json['content'] as List<dynamic>)
          .map((e) => Content.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$TopicDetailedToJson(TopicDetailed instance) =>
    <String, dynamic>{
      'chapter_name': instance.name,
      '_id': instance.id,
      'chapter_badge': instance.chapter_badge,
      'content': instance.content,
      'chapter_id': instance.chapter_id,
    };
