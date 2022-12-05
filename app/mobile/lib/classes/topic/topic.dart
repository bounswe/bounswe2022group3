import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'topic.g.dart';

@JsonSerializable()
class Topic {
  @JsonKey(name: 'name')
  final String name;

  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'space')
  final String space;

  Topic(this.name, this.id, this.space);
  factory Topic.fromJson(Map<String, dynamic> json) => _$TopicFromJson(json);

  Map<String, dynamic> toJson() => _$TopicToJson(this);
}

@JsonSerializable()
class TopicDetailed extends Topic {
  @JsonKey(name: 'creator')
  final User creator;

  @JsonKey(name: 'resources')
  final List<Resource> resources;

  @JsonKey(name: 'createdAt')
  final String createdAt;

  @JsonKey(name: 'updatedAt')
  final String updatedAt;

  TopicDetailed(super.name, super.id, super.space, this.creator, this.resources, this.createdAt, this.updatedAt);

  factory TopicDetailed.fromJson(Map<String, dynamic> json) => _$TopicDetailedFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$TopicDetailedToJson(this);
}