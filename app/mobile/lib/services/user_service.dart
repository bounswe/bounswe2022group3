// ignore_for_file: avoid_print

import 'package:bucademy/classes/user/login.dart';
import 'package:bucademy/classes/user/refresh.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/services/persistence_service.dart';
import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class UserService {
  User? user;
  Future<void> login({required String email, required String password}) async {
    try {
      Response res = await dioService.dio.post(
        '/user/login',
        data: {"email": email, "password": password},
      );
      if (res.statusCode != 200) return;

      Login login = Login.fromJson(res.data);
      await Future.wait([
        persistenceService.set(PersistenceKeys.email, login.email),
        persistenceService.set(PersistenceKeys.accessToken, login.access_token),
        persistenceService.set(PersistenceKeys.refreshToken, login.refresh_token),
        persistenceService.set(PersistenceKeys.name, login.name),
        persistenceService.set(PersistenceKeys.surname, login.surname),
      ]);
      print('Logged inn, ${await persistenceService.get(PersistenceKeys.refreshToken)}');
    } catch (e) {
      print(e);
    }
  }

  Future<bool> confirmMail({required String code}) async {
    try {
      Response res = await dioService.dio.post(
        '/user/confirm-email',
        data: {"code": code},
      );
      if (res.statusCode != 200) return false;

      Login login = Login.fromJson(res.data);
      await Future.wait([
        persistenceService.set(PersistenceKeys.email, login.email),
        persistenceService.set(PersistenceKeys.accessToken, login.access_token),
        persistenceService.set(PersistenceKeys.refreshToken, login.refresh_token),
        persistenceService.set(PersistenceKeys.name, login.name),
        persistenceService.set(PersistenceKeys.surname, login.surname),
      ]);
      return true;
    } catch (e) {
      print(e);
    }
    return false;
  }

  Future<void> register(
      {required String name, required String surname, required String email, required String password}) async {
    try {
      Response res = await dioService.dio.post(
        '/user/register',
        data: {
          "name": name,
          "surname": surname,
          "email": email,
          "password": password,
        },
      );
      if (res.statusCode != 200) return;

      print(res.data['message']);
    } catch (e) {
      print(e);
    }
  }

  Future<void> refresh() async {
    try {
      // ignore: non_constant_identifier_names
      String refresh_token = await persistenceService.get(PersistenceKeys.refreshToken);
      String email = await persistenceService.get(PersistenceKeys.email);
      if (email.isEmpty || refresh_token.isEmpty) return;

      Response res = await dioService.dio.post(
        '/user/refresh_tokens',
        data: {"email": email, "refresh_token": refresh_token},
      );
      if (res.statusCode != 200) return;

      Refresh refresh = Refresh.fromJson(res.data);
      await Future.wait([
        persistenceService.set(PersistenceKeys.accessToken, refresh.access_token),
        persistenceService.set(PersistenceKeys.refreshToken, refresh.refresh_token),
      ]);
      user = User(
        await persistenceService.get(PersistenceKeys.name),
        await persistenceService.get(PersistenceKeys.surname),
        email,
        "",
      );
    } catch (e) {
      print(e);
    }
  }
}
