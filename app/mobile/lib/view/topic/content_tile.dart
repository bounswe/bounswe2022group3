import 'package:bucademy/classes/content/content.dart';
import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:url_launcher/url_launcher.dart';

Widget contentTile(Resource r) {
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
              child: Text(r.name, style: TextStyles.pageTitle),
              color: Colors.red),
          Markdown(
            onTapLink: (text, href, title) async {
              if (href == null) return;
              if (!await launchUrl(Uri.parse(href))) {
                print('Could not launch the url');
              }
            },
            data: r.body,
            shrinkWrap: true,
            physics: const ClampingScrollPhysics(),
          ),
          // Column(
          //   children: [...c.media.map((e) => Padding(
          //     padding: const EdgeInsets.all(8.0),
          //     child: Image.network(e),
          //   ))],
          // )
        ],
      ));
}
