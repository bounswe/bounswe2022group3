import 'package:json_annotation/json_annotation.dart';

part 'resource.g.dart';

@JsonSerializable()
class Resource {
  @JsonKey(name: 'name')
  final String name;

  @JsonKey(name: 'body')
  final String body;

  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'average_rating')
  final double averageRating;

  final String topic;

  Resource(this.name, this.body, this.id, this.averageRating, this.topic);

  factory Resource.fromJson(Map<String, dynamic> json) => _$ResourceFromJson(json);

  Map<String, dynamic> toJson() => _$ResourceToJson(this);
}
