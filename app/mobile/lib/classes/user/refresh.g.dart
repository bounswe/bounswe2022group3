// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'refresh.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Refresh _$RefreshFromJson(Map<String, dynamic> json) => Refresh(
      json['message'] as String,
      json['access_token'] as String,
      json['refresh_token'] as String,
    );

Map<String, dynamic> _$RefreshToJson(Refresh instance) => <String, dynamic>{
      'message': instance.message,
      'access_token': instance.access_token,
      'refresh_token': instance.refresh_token,
    };
