import 'package:bucademy/classes/user/login.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/services/persistence_service.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class UserService {
  Future<void> login({required String email, required String password}) async {
    try {
      Response res = await dioService.dio.post('user/login', data: {email, password});
      if (res.statusCode != 200) return;

      Login login = Login.fromJson(res.data);
      await Future.wait([
        persistenceService.set(PersistenceKeys.email, login.email),
        persistenceService.set(PersistenceKeys.accessToken, login.access_token),
        persistenceService.set(PersistenceKeys.refreshToken, login.refresh_token),
      ]);

    } catch (e) {
      print(e);
    }
  }
  // Future<void> refresh(){}
}
