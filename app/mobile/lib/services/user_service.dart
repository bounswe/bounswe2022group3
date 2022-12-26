// ignore_for_file: avoid_print

import 'package:bucademy/classes/user/login.dart';
import 'package:bucademy/classes/user/refresh.dart';
import 'package:bucademy/classes/user/user.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/services/persistence_service.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';

@lazySingleton
class UserService {
  User? user;
  Future<bool> login({required String email, required String password}) async {
    try {
      Response res = await dioService.dio.post(
        '/user/login',
        data: {"email": email, "password": password},
      );
      if (res.statusCode != 200) return false;

      Login login = Login.fromJson(res.data);
      await Future.wait([
        persistenceService.set(PersistenceKeys.email, login.email),
        persistenceService.set(PersistenceKeys.accessToken, login.access_token),
        persistenceService.set(
            PersistenceKeys.refreshToken, login.refresh_token),
        persistenceService.set(PersistenceKeys.name, login.name),
        persistenceService.set(PersistenceKeys.surname, login.surname),
      ]);
      print(
          'Logged in, ${await persistenceService.get(PersistenceKeys.refreshToken)}');
      return true;
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<void> logout() async {
    persistenceService.clear();
    return;
  }

  Future<bool> isLoggedIn() async {
    var accessToken = await persistenceService.get(PersistenceKeys.accessToken);
    return accessToken != "";
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
        persistenceService.set(
            PersistenceKeys.refreshToken, login.refresh_token),
        persistenceService.set(PersistenceKeys.name, login.name),
        persistenceService.set(PersistenceKeys.surname, login.surname),
      ]);
      return true;
    } catch (e) {
      print(e);
    }
    return false;
  }

  Future<bool> register(
      {required String name,
      required String surname,
      required String email,
      required String password,
      required bool agreement,
      required List<String> tags,
      required BuildContext context}) async {
    var messages = {
      '201':
          "A verification email has been sent to $email. The link will be expired after one day.",
      '400': "You must agree to the Terms of Use and Privacy Policy.",
      '409': "The user already exists.",
    };
    try {
      Response res = await dioService.dio.post(
        '/user/register',
        data: {
          "name": name,
          "surname": surname,
          "email": email,
          "password": password,
          "agreement": agreement,
          "tags": tags,
        },
      );
      var snack = messages["${res.statusCode}"] ?? 'Registration failed.';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(snack)),
      );
      return res.statusCode == 201;
    } catch (e) {
      var firstLine = e.toString().split('\n')[0].split(' ');
      var bracketedCode = firstLine[firstLine.length - 1];
      var code = bracketedCode.substring(1, bracketedCode.length - 1);
      var snack = messages[code] ?? 'Registration failed.';
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(snack)),
      );
      return false;
    }
  }

  Future<void> refresh() async {
    try {
      // ignore: non_constant_identifier_names
      String refresh_token =
          await persistenceService.get(PersistenceKeys.refreshToken);
      String email = await persistenceService.get(PersistenceKeys.email);
      if (email.isEmpty || refresh_token.isEmpty) return;

      Response res = await dioService.dio.post(
        '/user/refresh_tokens',
        data: {"email": email, "refresh_token": refresh_token},
      );
      if (res.statusCode != 200) return;

      Refresh refresh = Refresh.fromJson(res.data);
      await Future.wait([
        persistenceService.set(
            PersistenceKeys.accessToken, refresh.access_token),
        persistenceService.set(
            PersistenceKeys.refreshToken, refresh.refresh_token),
      ]);
      user =
          User(refresh.name, refresh.surname, refresh.id, image: refresh.image);
    } catch (e) {
      print(e);
    }
  }
}

Future<List<String>?> getTags() async {
  try {
    Response res = await dioService.dio.get(
      '/userProfile/getTags',
    );
    if (res.statusCode == 201) {
      return res.data['tags'];
    } else {
      return null;
    }
  } catch (e) {
    print(e);
    return null;
  }
}
