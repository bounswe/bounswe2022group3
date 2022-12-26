// ignore_for_file: non_constant_identifier_names

import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'profile.g.dart';

@JsonSerializable()
class Profile {
  @JsonKey(name: '_id')
  final String id;
  final String? email;
  final String? name;
  final String? surname;
  final List<Enrollment>? enrollments;
  final List<Space>? created_spaces;
  final List<User>? followed_users;
  final List<User>? blocked_users;
  final List<User>? follower_users;
  final bool? is_private;
  final PersonalInfo? personal_info;
  String? createdAt;
  String? updatedAt;
  final String? image;

  Profile(this.id,
      {this.email,
      this.name,
      this.surname,
      this.enrollments,
      this.created_spaces,
      this.followed_users,
      this.follower_users,
      this.blocked_users,
      this.is_private,
      this.personal_info,
      this.createdAt,
      this.updatedAt,
      this.image});

  factory Profile.fromJson(Map<String, dynamic> json) =>
      _$ProfileFromJson(json);
  Map<String, dynamic> toJson() => _$ProfileToJson(this);
}

@JsonSerializable()
class PersonalInfo {
  @JsonKey(name: '_id')
  final String id;
  final String? bio;
  final List<String>? personal_achievements;
  final List<String>? interest_badges_selected;
  final List<String>? activities;
  final List<String>? knowledge;
  final List<String>? interests;
  final List<String>? badges;

  PersonalInfo(this.id, this.bio,
      {this.personal_achievements,
      this.interest_badges_selected,
      this.activities,
      this.knowledge,
      this.interests,
      this.badges});

  factory PersonalInfo.fromJson(Map<String, dynamic> json) =>
      _$PersonalInfoFromJson(json);
  Map<String, dynamic> toJson() => _$PersonalInfoToJson(this);
}

@JsonSerializable()
class Space {
  @JsonKey(name: '_id')
  String? id;
  String? name;

  Space({this.id, this.name});
  factory Space.fromJson(Map<String, dynamic> json) => _$SpaceFromJson(json);
  Map<String, dynamic> toJson() => _$SpaceToJson(this);
}

@JsonSerializable()
class Enrollment {
  @JsonKey(name: '_id')
  String? id;
  Space? space;

  Enrollment({this.id, this.space});
  factory Enrollment.fromJson(Map<String, dynamic> json) =>
      _$EnrollmentFromJson(json);
  Map<String, dynamic> toJson() => _$EnrollmentToJson(this);
}
