import 'package:bucademy/classes/content/content.dart';
import 'package:json_annotation/json_annotation.dart';

part 'topic.g.dart';

@JsonSerializable()
class Topic {
  @JsonKey(name: 'chapter_name')
  final String name;

  @JsonKey(name: '_id')
  final String id;

  Topic(this.name, this.id);
  factory Topic.fromJson(Map<String, dynamic> json) => _$TopicFromJson(json);

  Map<String, dynamic> toJson() => _$TopicToJson(this);
}

@JsonSerializable()
class TopicDetailed extends Topic {
  final Map<String, dynamic> chapter_badge;
  final List<Content> content;
  final String chapter_id;

  TopicDetailed(super.name, super.id, this.chapter_badge, this.chapter_id, this.content);

  factory TopicDetailed.fromJson(Map<String, dynamic> json) => _$TopicDetailedFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$TopicDetailedToJson(this);
}