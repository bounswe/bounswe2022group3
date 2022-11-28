import 'package:bucademy/classes/resource/resource.dart';
import 'package:json_annotation/json_annotation.dart';

part 'chapter.g.dart';

@JsonSerializable()
class Chapter {
  @JsonKey(name: 'name')
  final String name;

  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'resources')
  final List<Resource> resources;

  Chapter(this.name, this.id, this.resources);
  factory Chapter.fromJson(Map<String, dynamic> json) => _$ChapterFromJson(json);

  Map<String, dynamic> toJson() => _$ChapterToJson(this);
}
