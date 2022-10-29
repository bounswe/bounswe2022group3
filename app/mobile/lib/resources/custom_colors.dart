import 'dart:math';
import 'dart:ui';

List<String> colors = [
  "0xffe57373",
  "0xfff06292",
  "0xffba68c8",
  "0xff9575cd",
  "0xff7986cb",
  "0xff64b5f6",
  "0xff4fc3f7",
  "0xff4dd0e1",
  "0xff4db6ac",
  "0xff81c784",
  "0xffaed581",
  "0xffdce775",
  "0xfffff176",
  "0xffffd54f",
  "0xffffb74d",
  "0xffff8a65",
  "0xffa1887f",
  "0xffe0e0e0",
  "0xff90a4ae",
  "0xffc62828",
  "0xffad1457",
  "0xff6a1b9a",
  "0xff4527a0",
  "0xff283593",
  "0xff1565c0",
  "0xff0277bd",
  "0xff00838f",
  "0xff00695c",
  "0xff2e7d32",
  "0xff558b2f",
  "0xff9e9d24",
  "0xfff9a825",
  "0xffff8f00",
  "0xffef6c00",
  "0xffd84315",
  "0xff4e342e",
  "0xff424242",
  "0xff37474f",
];

class CustomColors {
  static const main = Color(0xff7d97f4);
  static Color getRandomColor() {
    return Color(int.parse(colors.elementAt(Random().nextInt(colors.length))));
  }
}
