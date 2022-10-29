import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'content.g.dart';

@JsonSerializable()
class Chapter {
  final String chapter_name;
  @JsonKey(name: '_id')
  final String chapter_id;
  final List<String> chapter_badge;
  final List<String> content;
  // final DateTime createdAt;

  Course(this.name, this.id, this.info, this.tags, this.badges, this.image, this.lecturer);

  factory Course.fromJson(Map<String, dynamic> json) => _$ContentFromJson(json);

  Map<String, dynamic> toJson() => _$ContentToJson(this);
}
