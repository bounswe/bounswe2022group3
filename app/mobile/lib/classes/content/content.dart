import 'package:json_annotation/json_annotation.dart';

part 'content.g.dart';

@JsonSerializable()
class Content {
  @JsonKey(name: 'name')
  final String name;

  @JsonKey(name: '_id')
  final String id;

  final String body;
  final List<String> media;
  final Map<String, dynamic> discussion;
  final String video;

  Content(this.name, this.id, this.body, this.media, this.discussion, this.video);
  factory Content.fromJson(Map<String, dynamic> json) => _$ContentFromJson(json);

  Map<String, dynamic> toJson() => _$ContentToJson(this);
}