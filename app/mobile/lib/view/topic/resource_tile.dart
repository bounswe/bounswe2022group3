import 'package:bucademy/classes/resource/resource.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:url_launcher/url_launcher.dart';

Widget resourceTile(Resource r, BuildContext context) {
  return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      margin: const EdgeInsets.only(bottom: 10) +
          EdgeInsets.symmetric(horizontal: 10),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 242, 241, 248),
        borderRadius: BorderRadius.circular(Constants.borderRadius),
      ),
      child: GestureDetector(
        onLongPress: () {
          showDialog(
              context: context,
              builder: ((context) => AlertDialog(
                    content: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 20),
                            child: Text(
                              "Discussion",
                              style: TextStyle(color: Colors.white),
                              textAlign: TextAlign.center,
                            ),
                            color: CustomColors.main,
                          ),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 20),
                            child: Text(
                              "Details",
                              style: TextStyle(color: Colors.white),
                              textAlign: TextAlign.center,
                            ),
                            color: Color.fromARGB(255, 68, 84, 141),
                          ),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 20),
                            child: Text(
                              "Edit",
                              style: TextStyle(color: Colors.white),
                              textAlign: TextAlign.center,
                            ),
                            color: CustomColors.main,
                          ),
                          Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 20),
                            child: Text(
                              "Delete",
                              style: TextStyle(color: Colors.white),
                              textAlign: TextAlign.center,
                            ),
                            color: Color.fromARGB(255, 68, 84, 141),
                          ),
                        ]),
                  )));
        },
        child: Column(
          children: [
            Container(
              child: Text(r.name, style: TextStyles.subtitle),
            ),
            Markdown(
              onTapLink: (text, href, title) async {
                if (href == null) return;
                if (!await launchUrl(Uri.parse(href))) {
                  print('Could not launch the url');
                }
              },
              styleSheet: MarkdownStyleSheet(
                  blockquoteDecoration:
                      BoxDecoration(color: CustomColors.main)),
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
        ),
      ));
}