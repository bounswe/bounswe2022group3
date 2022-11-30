// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Profile _$ProfileFromJson(Map<String, dynamic> json) => Profile(
      json['_id'] as String,
      email: json['email'] as String?,
      name: json['name'] as String?,
      surname: json['surname'] as String?,
      enrollments: (json['enrollments'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      created_spaces: (json['created_courses'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      followed_users: (json['followed_users'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      follower_users: (json['follower_users'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      blocked_users: (json['blocked_users'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      is_private: json['is_private'] as bool?,
      personal_info: json['personal_info'] == null
          ? null
          : PersonalInfo.fromJson(
              json['personal_info'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ProfileToJson(Profile instance) => <String, dynamic>{
      '_id': instance.id,
      'email': instance.email,
      'name': instance.name,
      'surname': instance.surname,
      'enrollments': instance.enrollments,
      'created_courses': instance.created_spaces,
      'followed_users': instance.followed_users,
      'follower_users': instance.follower_users,
      'blocked_users': instance.blocked_users,
      'is_private': instance.is_private,
      'personal_info': instance.personal_info,
    };

PersonalInfo _$PersonalInfoFromJson(Map<String, dynamic> json) => PersonalInfo(
      json['_id'] as String,
      json['bio'] as String?,
      personal_achievements: (json['personal_achievements'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      interest_badges_selected:
          (json['interest_badges_selected'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList(),
      personal_activities: (json['personal_activities'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      knowledge: (json['knowledge'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      interests: (json['interests'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      badges:
          (json['badges'] as List<dynamic>?)?.map((e) => e as String).toList(),
    );

Map<String, dynamic> _$PersonalInfoToJson(PersonalInfo instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'bio': instance.bio,
      'personal_achievements': instance.personal_achievements,
      'interest_badges_selected': instance.interest_badges_selected,
      'personal_activities': instance.personal_activities,
      'knowledge': instance.knowledge,
      'interests': instance.interests,
      'badges': instance.badges,
    };
