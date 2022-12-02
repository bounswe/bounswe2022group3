// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'comment.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Comment _$CommentFromJson(Map<String, dynamic> json) => Comment(
      json['comment'] as String,
      json['_id'] as String,
      (json['rating'] as num).toDouble(),
      User.fromJson(json['user'] as Map<String, dynamic>),
      DateTime.parse(json['createdAt'] as String),
    );

Map<String, dynamic> _$CommentToJson(Comment instance) => <String, dynamic>{
      '_id': instance.id,
      'comment': instance.comment,
      'rating': instance.rating,
      'user': instance.user,
      'createdAt': instance.createdAt.toIso8601String(),
    };
