import 'package:bucademy/classes/user/user.dart';
import 'package:json_annotation/json_annotation.dart';

part 'event.g.dart';

@JsonSerializable()
class Event {
  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'space_id')
  final String spaceId;

  @JsonKey(name: 'creator')
  final String creator;

  @JsonKey(name: 'event_title')
  String title;

  @JsonKey(name: 'start_date')
  String startDate;

  @JsonKey(name: 'end_date')
  String? endDate;

  @JsonKey(name: 'description')
  String description;

  @JsonKey(name: 'location')
  Map<String, double> location;

  @JsonKey(name: 'quota')
  int? quota;

  @JsonKey(name: 'participants')
  List<User> participants = [];

  @JsonKey(name: 'participant_count')
  int participantCount = 0;

  Event(this.id, this.spaceId, this.creator, this.title, this.startDate,
      this.description, this.location, this.participants, this.participantCount,
      {this.endDate, this.quota});
  factory Event.fromJson(Map<String, dynamic> json) => _$EventFromJson(json);

  Map<String, dynamic> toJson() => _$EventToJson(this);
}

@JsonSerializable()
class EventShortened {
  @JsonKey(name: '_id')
  final String id;

  @JsonKey(name: 'event_title')
  final String title;

  EventShortened(this.title, this.id);
  factory EventShortened.fromJson(Map<String, dynamic> json) =>
      _$EventShortenedFromJson(json);

  Map<String, dynamic> toJson() => _$EventShortenedToJson(this);
}
