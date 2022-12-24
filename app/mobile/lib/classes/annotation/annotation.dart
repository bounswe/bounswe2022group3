/*import 'package:bucademy/classes/resource/resource.dart';
import 'package:json_annotation/json_annotation.dart';

part 'annotation.g.dart';

@JsonSerializable()
class Annotation {
  @JsonKey(name: '_id')
  final String id;
  final String resource;
  final Body body;
  final List<Selector> target;
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
class Body {
  final String type;
  final String value;
  final String purpose;
  final Creator creator;
  final String created;
  final String modified;

  Body(this.type, this.value, this.purpose, this.creator, this.created,
      this.modified);
  factory Body.fromJson(Map<String, dynamic> json) => _$BodyFromJson(json);
  Map<String, dynamic> toJson() => _$BodyToJson(this);
}

@JsonSerializable()
class Selector {
  final String? type;
  final String? exact;
  final int? start;
  final int? end;
  Selector({this.type, this.exact, this.start, this.end});
  factory Selector.fromJson(Map<String, dynamic> json) =>
      _$SelectorFromJson(json);
  Map<String, dynamic> toJson() => _$SelectorToJson(this);
}

@JsonSerializable()
class Creator {
  @JsonKey(name: 'id')
  final String id;

  @JsonKey(name: 'name')
  final String name;

  Creator(this.id, this.name);
  factory Creator.fromJson(Map<String, dynamic> json) =>
      _$CreatorFromJson(json);
  Map<String, dynamic> toJson() => _$CreatorToJson(this);
}
*/
class Annotation {
  String? context;
  String? type;
  List<Body>? body;
  Target? target;
  String? id;
  String? resource;

  Annotation(
      {this.context,
      this.type,
      this.body,
      this.target,
      this.id,
      this.resource});

  Annotation.fromJson(Map<String, dynamic> json) {
    context = json['@context'];
    type = json['type'];
    if (json['body'] != null) {
      body = <Body>[];
      json['body'].forEach((v) {
        body!.add(Body.fromJson(v));
      });
    }
    target = json['target'] != null ? Target.fromJson(json['target']) : null;
    id = json['id'];
    resource = json['resource'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['@context'] = context;
    data['type'] = type;
    if (body != null) {
      data['body'] = body!.map((v) => v.toJson()).toList();
    }
    if (target != null) {
      data['target'] = target!.toJson();
    }
    data['id'] = id;
    data['resource'] = resource;
    return data;
  }
}

class Body {
  String? purpose;
  String? type;
  String? value;
  Creator? creator;
  String? created;
  String? modified;

  Body(
      {this.purpose,
      this.type,
      this.value,
      this.creator,
      this.created,
      this.modified});

  Body.fromJson(Map<String, dynamic> json) {
    purpose = json['purpose'];
    type = json['type'];
    value = json['value'];
    creator =
        json['creator'] != null ? Creator.fromJson(json['creator']) : null;
    created = json['created'];
    modified = json['modified'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['purpose'] = purpose;
    data['type'] = type;
    data['value'] = value;
    if (creator != null) {
      data['creator'] = creator!.toJson();
    }
    data['created'] = created;
    data['modified'] = modified;
    return data;
  }
}

class Creator {
  String? id;
  String? name;

  Creator({this.id, this.name});

  Creator.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    return data;
  }
}

class Target {
  List<Selector>? selector;

  Target({this.selector});

  Target.fromJson(Map<String, dynamic> json) {
    if (json['selector'] != null) {
      selector = <Selector>[];
      json['selector'].forEach((v) {
        selector!.add(Selector.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (selector != null) {
      data['selector'] = selector!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Selector {
  String? type;
  String? exact;
  int? start;
  int? end;

  Selector({this.type, this.exact, this.start, this.end});

  Selector.fromJson(Map<String, dynamic> json) {
    type = json['type'];
    exact = json['exact'];
    start = json['start'];
    end = json['end'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['type'] = type;
    if (exact != null) {
      data['exact'] = exact;
    }
    if (start != null) {
      data['start'] = start;
    }
    if (end != null) {
      data['end'] = end;
    }
    return data;
  }
}
