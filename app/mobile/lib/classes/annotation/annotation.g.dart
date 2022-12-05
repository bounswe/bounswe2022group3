// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'annotation.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Annotation _$AnnotationFromJson(Map<String, dynamic> json) => Annotation(
      json['_id'] as String,
      Resource.fromJson(json['resource'] as Map<String, dynamic>),
      AnnotationBody.fromJson(json['body'] as Map<String, dynamic>),
      (json['target'] as List<dynamic>)
          .map((e) => AnnotationSelector.fromJson(e as Map<String, dynamic>))
          .toList(),
      json['@context'] as String,
      json['type'] as String,
    );

Map<String, dynamic> _$AnnotationToJson(Annotation instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'resource': instance.resource,
      'body': instance.body,
      'target': instance.target,
      '@context': instance.context,
      'type': instance.type,
    };

AnnotationBody _$AnnotationBodyFromJson(Map<String, dynamic> json) =>
    AnnotationBody(
      json['type'] as String,
      json['value'] as String,
      json['purpose'] as String,
      MiniUser.fromJson(json['creator'] as Map<String, dynamic>),
      json['created'] as String,
      json['modified'] as String,
    );

Map<String, dynamic> _$AnnotationBodyToJson(AnnotationBody instance) =>
    <String, dynamic>{
      'type': instance.type,
      'value': instance.value,
      'purpose': instance.purpose,
      'creator': instance.creator,
      'created': instance.created,
      'modified': instance.modified,
    };

AnnotationSelector _$AnnotationSelectorFromJson(Map<String, dynamic> json) =>
    AnnotationSelector(
      json['type'] as String,
      json['exact'] as String,
      json['start'] as int,
      json['end'] as int,
    );

Map<String, dynamic> _$AnnotationSelectorToJson(AnnotationSelector instance) =>
    <String, dynamic>{
      'type': instance.type,
      'exact': instance.exact,
      'start': instance.start,
      'end': instance.end,
    };

MiniUser _$MiniUserFromJson(Map<String, dynamic> json) => MiniUser(
      json['id'] as String,
      json['name'] as String,
    );

Map<String, dynamic> _$MiniUserToJson(MiniUser instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
    };
