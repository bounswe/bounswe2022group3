// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'note.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Note _$NoteFromJson(Map<String, dynamic> json) => Note(
      json['title'] as String,
      json['body'] as String,
      json['_id'] as String,
      ResourceShortened.fromJson(json['resource'] as Map<String, dynamic>),
      User.fromJson(json['creator'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$NoteToJson(Note instance) => <String, dynamic>{
      'title': instance.title,
      'body': instance.body,
      '_id': instance.id,
      'resource': instance.resource,
      'creator': instance.creator,
    };
