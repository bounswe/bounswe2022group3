import 'package:json_annotation/json_annotation.dart';

part 'chapter.g.dart';

@JsonSerializable()
class Chapter {
  @JsonKey(name: 'chapter_name')
  final String name;

  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'content')
  final List<String> contentIds;

  Chapter(this.name, this.id, this.contentIds);
  factory Chapter.fromJson(Map<String, dynamic> json) => _$ChapterFromJson(json);

  Map<String, dynamic> toJson() => _$ChapterToJson(this);
}
