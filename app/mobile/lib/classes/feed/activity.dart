import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'activity.g.dart';

@JsonSerializable()
class Activity {
  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'space')
  String? spaceId;

  @JsonKey(name: 'topic')
  String? topicId;

  @JsonKey(name: 'resource')
  String? resourceId;

  @JsonKey(name: 'discussion')
  String? discussionId;

  @JsonKey(name: 'body')
  String body;

  @JsonKey(name: 'user')
  User user;

  @JsonKey(name: 'createdAt')
  final DateTime createdAt;

  @JsonKey(name: 'updatedAt')
  final DateTime updatedAt;

  @JsonKey(ignore: true)
  String? timeDiff = "";

  Activity(this.id, this.body, this.createdAt, this.updatedAt, this.resourceId,
      this.spaceId, this.topicId, this.discussionId, this.user) {
    int timeDiffStart = body.lastIndexOf(',');
    timeDiff = body.substring(timeDiffStart + 1);
    body = body.substring(0, timeDiffStart);
  }
  factory Activity.fromJson(Map<String, dynamic> json) =>
      _$ActivityFromJson(json);

  Map<String, dynamic> toJson() => _$ActivityToJson(this);
}
