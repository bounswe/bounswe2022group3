import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'resource.g.dart';

@JsonSerializable()
class Resource {
  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'name')
  final String name;

  @JsonKey(name: 'body')
  final String body;

  @JsonKey(name: 'topic')
  final String topic;

  @JsonKey(name: 'creator')
  final User creator;

  @JsonKey(name: 'average_rating')
  final double averageRating;

  // @JsonKey(name: 'ratings')
  // final List<bişi bişi>

  @JsonKey(name: 'discussion')
  final Discussion? discussion; //TODO: discussion class will be added

  @JsonKey(name: 'createdAt')
  final DateTime createdAt;

  @JsonKey(name: 'updatedAt')
  final DateTime updatedAt;

  Resource(this.id, this.name, this.body,this.topic, this.creator, this.averageRating, this.createdAt, this.updatedAt, this.discussion);

  factory Resource.fromJson(Map<String, dynamic> json) => _$ResourceFromJson(json);

  Map<String, dynamic> toJson() => _$ResourceToJson(this);
}