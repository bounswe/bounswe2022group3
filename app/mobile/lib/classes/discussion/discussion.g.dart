// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'discussion.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Discussion _$DiscussionFromJson(Map<String, dynamic> json) => Discussion(
      json['title'] as String,
      json['_id'] as String,
      (json['comments'] as List<dynamic>)
          .map((e) => Comment.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$DiscussionToJson(Discussion instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'title': instance.title,
      'comments': instance.comments,
    };

DiscussionShortened _$DiscussionShortenedFromJson(Map<String, dynamic> json) =>
    DiscussionShortened(
      json['title'] as String,
      json['_id'] as String,
    );

Map<String, dynamic> _$DiscussionShortenedToJson(
        DiscussionShortened instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'title': instance.title,
    };
