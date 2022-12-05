import 'package:bucademy/classes/discussion/comment.dart';
import 'package:bucademy/classes/discussion/discussion.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:bucademy/view/widgets/markdown_input.dart';
import 'package:bucademy/view/widgets/profile_picture.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:intl/intl.dart';
import 'package:stacked/stacked.dart';
import 'package:url_launcher/url_launcher.dart';

Container commentTile(Comment c) => Container(
      margin: const EdgeInsets.symmetric(vertical: 0, horizontal: 8),
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              profilePicture(imagePath: 'https://randomuser.me/api/portraits/men/40.jpg'),
              const SizedBox(width: 10),
              Expanded(
                  child: Markdown(
                onTapLink: (text, href, title) async {
                  if (href == null) return;
                  if (!await launchUrl(Uri.parse(href))) {
                    print('Could not launch the url');
                  }
                },
                data: c.comment,
                shrinkWrap: true,
                physics: const ClampingScrollPhysics(),
              )),
            ],
          ),
          const SizedBox(height: 5),
          Text(
            '${DateFormat.Hm().format(c.createdAt)} ${DateFormat.MMMEd().format(c.createdAt)}',
            style: TextStyles.infoGrey,
          ),
        ],
      ),
    );
