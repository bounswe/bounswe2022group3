// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'resource.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Resource _$ResourceFromJson(Map<String, dynamic> json) => Resource(
      json['_id'] as String,
      json['name'] as String,
      json['body'] as String,
      json['topic'] as String,
      User.fromJson(json['creator'] as Map<String, dynamic>),
      (json['average_rating'] as num).toDouble(),
      DateTime.parse(json['createdAt'] as String),
      DateTime.parse(json['updatedAt'] as String),
      json['discussion'] == null
          ? null
          : DiscussionShortened.fromJson(
              json['discussion'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ResourceToJson(Resource instance) => <String, dynamic>{
      '_id': instance.id,
      'name': instance.name,
      'body': instance.body,
      'topic': instance.topic,
      'creator': instance.creator,
      'average_rating': instance.averageRating,
      'discussion': instance.discussion,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };
