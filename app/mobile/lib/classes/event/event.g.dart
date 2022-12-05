// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'event.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Event _$EventFromJson(Map<String, dynamic> json) => Event(
      json['_id'] as String,
      json['space_id'] as String,
      json['creator'] as String,
      json['event_title'] as String,
      json['start_date'] as String,
      json['end_date'] as String,
      json['description'] as String,
      {
        'longitude': json['location']['longitude'],
        'latitude': json['location']['latitude']
      },
      //(json['location'] as Map<String, dynamic>).map(
      //  (k, e) => MapEntry(k, (e as num).toDouble()),
      //),
      json['quota'] as int,
      (json['participants'] as List<dynamic>).map((e) => e as String).toList(),
      json['participant_count'] as int,
    );

Map<String, dynamic> _$EventToJson(Event instance) => <String, dynamic>{
      '_id': instance.id,
      'space_id': instance.spaceId,
      'creator': instance.creator,
      'event_title': instance.title,
      'start_date': instance.startDate,
      'end_date': instance.endDate,
      'description': instance.description,
      'location': instance.location,
      'quota': instance.quota,
      'participants': instance.participants,
      'participant_count': instance.participantCount,
    };

EventShortened _$EventShortenedFromJson(Map<String, dynamic> json) =>
    EventShortened(
      json['event_title'] as String,
      json['_id'] as String,
    );

Map<String, dynamic> _$EventShortenedToJson(EventShortened instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'event_title': instance.title,
    };
