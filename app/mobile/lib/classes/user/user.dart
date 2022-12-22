import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final String name, surname;
  @JsonKey(name: '_id')
  final String id;
  String? image;

  User(this.name, this.surname, this.id, { this.image });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);
}
