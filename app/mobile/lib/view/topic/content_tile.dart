import 'package:bucademy/classes/content/content.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:flutter/material.dart';

Widget contentTile(Content c) {
  return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 242, 241, 248),
        borderRadius: BorderRadius.circular(Constants.borderRadius),
      ),
      child: Column(
        children: [
          Container(
              child: Text(c.name, style: TextStyles.pageTitle),
              color: Colors.red),
          Text(c.body),
          Column(
            children: [...c.media.map((e) => Padding(
              padding: const EdgeInsets.all(8.0),
              child: Image.network(e),
            ))],
          )
        ],
      ));
}
