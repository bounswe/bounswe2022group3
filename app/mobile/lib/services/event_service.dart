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
      return Event.fromJson(json['event']);
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
    required String endDate,
    required String description,
    required Map<String, double> location,
    required int quota,
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
}
