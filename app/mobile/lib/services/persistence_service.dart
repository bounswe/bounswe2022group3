import 'package:shared_preferences/shared_preferences.dart';

enum PersistenceKeys { accessToken, refreshToken, email }

extension PersistenceKeysExtension on PersistenceKeys {
  String get name {
    switch (this) {
      case PersistenceKeys.accessToken:
        return "access_token";
      case PersistenceKeys.refreshToken:
        return 'refresh_token';
      case PersistenceKeys.email:
        return 'email';
    }
  }
}

class PersistenceService {
  Future<SharedPreferences> _instance() async => await SharedPreferences.getInstance();
  Future<dynamic> get(PersistenceKeys key) async {
    SharedPreferences instance = await _instance();
    if (instance.containsKey(key.name)) return instance.get(key.name);
    return "";
  }

  Future<dynamic> set(PersistenceKeys key, dynamic value) async {
    switch (value.runtimeType) {
      case String:
        (await _instance()).setString(key.name, value);
        break;
      default:
        throw "Unsupported type for persistence service";
    }
  }
}
