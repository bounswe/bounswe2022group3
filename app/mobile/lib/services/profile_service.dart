import 'package:bucademy/services/locator.dart';
import 'package:injectable/injectable.dart';

class Badge {
  String title;
  String def;

  Badge(this.title, this.def);
}

class Profile {
  String id;
  String name;
  String surname;
  String image;
  int? followers;
  int? followed;
  double? rating;
  String? bio;
  List<String>? interests;
  List<String>? knowledge;
  List<String>? activities;
  List<Badge>? badges;
  List<String>? achievements;

  Profile(this.id, this.name, this.surname, this.image,
      {this.followers,
      this.followed,
      this.rating,
      this.bio,
      this.interests,
      this.knowledge,
      this.activities,
      this.achievements,
      this.badges});
}

@lazySingleton
class ProfileService {
  getActivities() {}
}
