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
  final String resourceId;

  Note(this.title, this.body, this.id, this.resourceId);
  factory Note.fromJson(Map<String, dynamic> json) => _$NoteFromJson(json);

  Map<String, dynamic> toJson() => _$NoteToJson(this);
}
