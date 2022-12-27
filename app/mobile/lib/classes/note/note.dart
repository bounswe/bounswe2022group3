import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'note.g.dart';

@JsonSerializable()
class Note {
  @JsonKey(name: 'title')
  final String title;

  @JsonKey(name: 'body')
  String body; // body of a note may change

  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'resource')
  final ResourceShortened resource;

  @JsonKey(name: 'creator')
  final User creator;

  Note(this.title, this.body, this.id, this.resource, this.creator);
  factory Note.fromJson(Map<String, dynamic> json) => _$NoteFromJson(json);

  Map<String, dynamic> toJson() => _$NoteToJson(this);
}
