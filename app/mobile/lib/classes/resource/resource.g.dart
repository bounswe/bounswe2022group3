// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'resource.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Resource _$ResourceFromJson(Map<String, dynamic> json) => Resource(
      json['name'] as String,
      json['body'] as String,
      json['_id'] as String,
      (json['average_rating'] as num).toDouble(),
      json['topic'] as String,
    );

Map<String, dynamic> _$ResourceToJson(Resource instance) => <String, dynamic>{
      'name': instance.name,
      'body': instance.body,
      '_id': instance.id,
      'average_rating': instance.averageRating,
      'topic': instance.topic,
    };
