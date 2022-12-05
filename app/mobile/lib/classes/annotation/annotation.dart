import 'package:bucademy/classes/resource/resource.dart';
import 'package:json_annotation/json_annotation.dart';

part 'annotation.g.dart';

@JsonSerializable()
class Annotation {
  @JsonKey(name: '_id')
  final String id;
  final String resource;
  final AnnotationBody body;
  final List<AnnotationSelector> target;
  @JsonKey(name: '@context')
  final String context; // = 'http://www.w3.org/ns/anno.jsonld';
  final String type; // = 'Annotation';

  Annotation(
      this.id, this.resource, this.body, this.target, this.context, this.type);
  factory Annotation.fromJson(Map<String, dynamic> json) =>
      _$AnnotationFromJson(json);
  Map<String, dynamic> toJson() => _$AnnotationToJson(this);
}

@JsonSerializable()
class AnnotationBody {
  final String type;
  final String value;
  final String purpose;
  final MiniUser creator;
  final String created;
  final String modified;

  AnnotationBody(this.type, this.value, this.purpose, this.creator,
      this.created, this.modified);
  factory AnnotationBody.fromJson(Map<String, dynamic> json) =>
      _$AnnotationBodyFromJson(json);
  Map<String, dynamic> toJson() => _$AnnotationBodyToJson(this);
}

@JsonSerializable()
class AnnotationSelector {
  final String type;
  final String exact;
  final int start;
  final int end;
  AnnotationSelector(this.type, this.exact, this.start, this.end);
  factory AnnotationSelector.fromJson(Map<String, dynamic> json) =>
      _$AnnotationSelectorFromJson(json);
  Map<String, dynamic> toJson() => _$AnnotationSelectorToJson(this);
}

@JsonSerializable()
class MiniUser {
  @JsonKey(name: 'id')
  final String id;

  @JsonKey(name: 'name')
  final String name;

  MiniUser(this.id, this.name);
  factory MiniUser.fromJson(Map<String, dynamic> json) =>
      _$MiniUserFromJson(json);
  Map<String, dynamic> toJson() => _$MiniUserToJson(this);
}
