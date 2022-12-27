class Constants {
  static const borderRadius = 14.0;
  static const backendUrl = "http://3.72.116.99:5000";
  static const frontendUrl = "https://bucademy.tk";
}

String fullImagePath(String? filename) =>
    "${Constants.backendUrl}/user/${filename ?? 'default.png'}";
