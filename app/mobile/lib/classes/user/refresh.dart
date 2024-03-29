import 'package:json_annotation/json_annotation.dart';

part 'refresh.g.dart';

@JsonSerializable()
class Refresh {
  // ignore: non_constant_identifier_names
  final access_token, refresh_token;
  final String name, surname, image, id;

  Refresh(this.access_token, this.refresh_token, this.name, this.surname, this.image, this.id);

  factory Refresh.fromJson(Map<String, dynamic> json) =>
      _$RefreshFromJson(json);

  Map<String, dynamic> toJson() => _$RefreshToJson(this);
}
