import 'package:bucademy/classes/discussion/comment.dart';
import 'package:bucademy/classes/resource/resource.dart';
import 'package:json_annotation/json_annotation.dart';

part 'discussion.g.dart';

@JsonSerializable()
class Discussion {
  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'title')
  final String title;

  @JsonKey(name: 'comments')
  final List<Comment> comments;

  Discussion(this.title, this.id, this.comments);
  factory Discussion.fromJson(Map<String, dynamic> json) => _$DiscussionFromJson(json);

  Map<String, dynamic> toJson() => _$DiscussionToJson(this);
}


@JsonSerializable()
class DiscussionShortened {
  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'title')
  final String title;

  DiscussionShortened(this.title, this.id);
  factory DiscussionShortened.fromJson(Map<String, dynamic> json) => _$DiscussionShortenedFromJson(json);

  Map<String, dynamic> toJson() => _$DiscussionShortenedToJson(this);
}
