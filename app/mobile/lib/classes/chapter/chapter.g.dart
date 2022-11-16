// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'chapter.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Chapter _$ChapterFromJson(Map<String, dynamic> json) => Chapter(
      json['chapter_name'] as String,
      json['_id'] as String,
      (json['content'] as List<dynamic>).map((e) => e as String).toList(),
    );

Map<String, dynamic> _$ChapterToJson(Chapter instance) => <String, dynamic>{
      'chapter_name': instance.name,
      '_id': instance.id,
      'content': instance.contentIds,
    };
