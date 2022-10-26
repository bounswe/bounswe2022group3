// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Login _$LoginFromJson(Map<String, dynamic> json) => Login(
      json['id'] as String,
      json['email'] as String,
      json['access_token'] as String,
      json['refresh_token'] as String,
    );

Map<String, dynamic> _$LoginToJson(Login instance) => <String, dynamic>{
      'id': instance.id,
      'email': instance.email,
      'access_token': instance.access_token,
      'refresh_token': instance.refresh_token,
    };
