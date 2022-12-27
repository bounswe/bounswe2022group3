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
          ?.map((e) => Enrollment.fromJson(e as Map<String, dynamic>))
          .toList(),
      created_spaces: (json['created_spaces'] as List<dynamic>?)
          ?.map((e) => Space.fromJson(e as Map<String, dynamic>))
          .toList(),
      followed_users: (json['followed_users'] as List<dynamic>?)
          ?.map((e) => User.fromJson(e as Map<String, dynamic>))
          .toList(),
      follower_users: (json['follower_users'] as List<dynamic>?)
          ?.map((e) => User.fromJson(e as Map<String, dynamic>))
          .toList(),
      blocked_users: (json['blocked_users'] as List<dynamic>?)
          ?.map((e) => User.fromJson(e as Map<String, dynamic>))
          .toList(),
      is_private: json['is_private'] as bool?,
      personal_info: json['personal_info'] == null
          ? null
          : PersonalInfo.fromJson(
              json['personal_info'] as Map<String, dynamic>),
      createdAt: json['createdAt'] as String?,
      updatedAt: json['updatedAt'] as String?,
      image: json['image'] as String?,
    );

Map<String, dynamic> _$ProfileToJson(Profile instance) => <String, dynamic>{
      '_id': instance.id,
      'email': instance.email,
      'name': instance.name,
      'surname': instance.surname,
      'enrollments': instance.enrollments,
      'created_spaces': instance.created_spaces,
      'followed_users': instance.followed_users,
      'blocked_users': instance.blocked_users,
      'follower_users': instance.follower_users,
      'is_private': instance.is_private,
      'personal_info': instance.personal_info,
      'createdAt': instance.createdAt,
      'updatedAt': instance.updatedAt,
      'image': instance.image,
    };

PersonalInfo _$PersonalInfoFromJson(Map<String, dynamic> json) => PersonalInfo(
      id: json['_id'] as String,
      bio: json['bio'] as String?,
      personal_achievements: (json['personal_achievements'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      interest_badges_selected:
          (json['interest_badges_selected'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList(),
      activities: (json['activities'] as List<dynamic>?)
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
      'activities': instance.activities,
      'knowledge': instance.knowledge,
      'interests': instance.interests,
      'badges': instance.badges,
    };

Space _$SpaceFromJson(Map<String, dynamic> json) => Space(
      id: json['_id'] as String?,
      name: json['name'] as String?,
    );

Map<String, dynamic> _$SpaceToJson(Space instance) => <String, dynamic>{
      '_id': instance.id,
      'name': instance.name,
    };

Enrollment _$EnrollmentFromJson(Map<String, dynamic> json) => Enrollment(
      id: json['_id'] as String?,
      space: json['space'] == null
          ? null
          : Space.fromJson(json['space'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$EnrollmentToJson(Enrollment instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'space': instance.space,
    };
