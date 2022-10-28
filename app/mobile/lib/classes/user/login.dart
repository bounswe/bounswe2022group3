import 'package:json_annotation/json_annotation.dart';

part 'login.g.dart';

@JsonSerializable()
class Login {
  // ignore: non_constant_identifier_names
  final String id, email, access_token, refresh_token;

  Login(this.id, this.email, this.access_token, this.refresh_token);

  factory Login.fromJson(Map<String, dynamic> json) => _$LoginFromJson(json);

  Map<String, dynamic> toJson() => _$LoginToJson(this);
}
