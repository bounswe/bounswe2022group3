import 'dart:math';
import 'dart:ui';

List<Color> colors = const [
  Color(0xffe57373),
  Color(0xfff06292),
  Color(0xffba68c8),
  Color(0xff9575cd),
  Color(0xff7986cb),
  Color(0xff64b5f6),
  Color(0xff4fc3f7),
  Color(0xff4dd0e1),
  Color(0xff4db6ac),
  Color(0xff81c784),
  Color(0xffff8a65),
  Color(0xffa1887f),
  Color(0xffe0e0e0),
  Color(0xff90a4ae),
  Color(0xffc62828),
  Color(0xffad1457),
  Color(0xff6a1b9a),
  Color(0xff4527a0),
  Color(0xff283593),
  Color(0xff1565c0),
  Color(0xff0277bd),
  Color(0xff00838f),
  Color(0xff00695c),
  Color(0xff2e7d32),
  Color(0xff558b2f),
  Color(0xff9e9d24),
  Color(0xffff8f00),
  Color(0xffef6c00),
  Color(0xffd84315),
];

List<Color> recentlyReturned = [];

class CustomColors {
  static const main = Color(0xff7d97f4);
  static Color getRandomColor() {
    Color? color;
    while (color == null) {
      color = colors.elementAt(Random().nextInt(colors.length));
      if (recentlyReturned.contains(color)) continue;
      recentlyReturned.add(color);
      if (recentlyReturned.length > 10) recentlyReturned.removeAt(0);
    }
    return color;
  }
}
