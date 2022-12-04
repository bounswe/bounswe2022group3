// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'note.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Note _$NoteFromJson(Map<String, dynamic> json) => Note(
      json['title'] as String,
      json['body'] as String,
      json['_id'] as String,
      json['resource'] as String,
    );

Map<String, dynamic> _$NoteToJson(Note instance) => <String, dynamic>{
      'title': instance.title,
      'body': instance.body,
      '_id': instance.id,
      'resource': instance.resourceId,
    };
