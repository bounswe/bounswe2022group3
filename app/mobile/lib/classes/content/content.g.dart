// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'content.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Content _$ContentFromJson(Map<String, dynamic> json) => Content(
      json['name'] as String,
      json['_id'] as String,
      json['body'] as String,
      (json['media'] as List<dynamic>).map((e) => e as String).toList(),
      json['discussion'] as Map<String, dynamic>,
      json['video'] as String,
    );

Map<String, dynamic> _$ContentToJson(Content instance) => <String, dynamic>{
      'name': instance.name,
      '_id': instance.id,
      'body': instance.body,
      'media': instance.media,
      'discussion': instance.discussion,
      'video': instance.video,
    };
