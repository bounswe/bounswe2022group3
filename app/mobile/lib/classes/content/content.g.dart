// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'content.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Content _$ContentFromJson(Map<String, dynamic> json) => Content(
      json['content_name'] as String,
      json['_id'] as String,
      json['body'] as String,
      (json['media'] as List<dynamic>).map((e) => e as String).toList(),
      json['discussion'] as String,
      json['video'] as String,
    );

Map<String, dynamic> _$ContentToJson(Content instance) => <String, dynamic>{
      'content_name': instance.name,
      '_id': instance.id,
      'body': instance.body,
      'media': instance.media,
      'discussion': instance.discussion,
      'video': instance.video,
    };
