// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'refresh.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Refresh _$RefreshFromJson(Map<String, dynamic> json) => Refresh(
      json['access_token'],
      json['refresh_token'],
      json['name'] as String,
      json['surname'] as String,
      json['image'] as String,
      json['id'] as String,
    );

Map<String, dynamic> _$RefreshToJson(Refresh instance) => <String, dynamic>{
      'access_token': instance.access_token,
      'refresh_token': instance.refresh_token,
      'name': instance.name,
      'surname': instance.surname,
      'image': instance.image,
      'id': instance.id,
    };
