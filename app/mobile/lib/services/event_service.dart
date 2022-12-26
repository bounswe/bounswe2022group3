import 'package:bucademy/services/locator.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';
import '../classes/event/event.dart';

@lazySingleton
class EventService {
  Future<Event?> getEvent({
    required String eventId,
  }) async {
    try {
      Response response = await dioService.dio.get('/event/$eventId');
      if (response.statusCode != 200) {
        return null;
      }
      Map json = response.data;
      return Event.fromJson({
        '_id': json['event']['_id'],
        'space_id': json['event']['space_id']['_id'],
        'creator': json['event']['creator']['_id'],
        'event_title': json['event']['event_title'],
        'start_date': json['event']['start_date'],
        'end_date': json['event']['end_date'],
        'description': json['event']['description'],
        'location': {
          'longitude': json['event']['location']['longitude'],
          'latitude': json['event']['location']['latitude']
        },
        'quota': json['event']['quota'],
        'participants': json['event']['participants'],
        'participant_count': json['event']['participant_count'],
      });
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<Event?> createEvent({
    required String spaceId,
    required String creator,
    required String title,
    required String startDate,
    String? endDate,
    required String description,
    required Map<String, double> location,
    int? quota,
    //required String visibility,
    //required double fee,
    //required String medium
  }) async {
    try {
      Response response = await dioService.dio.post('/event', data: {
        'space_id': spaceId,
        'creator': creator,
        'event_title': title,
        'start_date': startDate,
        'end_date': endDate,
        'description': description,
        'location': location,
        'quota': quota,
        //'visibility': visibility,
        //'fee': fee,
        //'is_online': medium,
      });
      if (response.statusCode != 201) {
        return null;
      }
      Map json = response.data;
      return Event.fromJson(json['event']);
    } catch (e) {
      print(e);
    }
    return null;
  }

  Future<String?> participateToEvent({required Event event}) async {
    try {
      Response response =
          await dioService.dio.post('/event/participate/${event.id}');
      if (response.statusCode == 200) {
        event.participants.add(userService.user!);
        event.participantCount++;
      }
      return response.data['message'];
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future<String?> unparticipateToEvent({required Event event}) async {
    try {
      Response response =
          await dioService.dio.post('/event/unparticipate/${event.id}');
      if (response.statusCode == 200) {
        event.participants.remove(userService.user!);
        event.participantCount--;
      }
      return response.data['message'];
    } catch (e) {
      print(e);
      return null;
    }
  }
}
