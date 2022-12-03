import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'comment.g.dart';

@JsonSerializable()
class Comment {
  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'comment')
  final String comment;

  @JsonKey(name: 'rating')
  final double rating;

  @JsonKey(name: 'user')
  final User user;

  @JsonKey(name: 'createdAt')
  final DateTime createdAt;

  Comment(this.comment, this.id, this.rating, this.user, this.createdAt);
  factory Comment.fromJson(Map<String, dynamic> json) => _$CommentFromJson(json);

  Map<String, dynamic> toJson() => _$CommentToJson(this);
}
