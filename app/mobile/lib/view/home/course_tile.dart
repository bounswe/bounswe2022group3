import 'package:bucademy/classes/course/course.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/constants.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/view/course/coursepage.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';

GestureDetector courseTile(Course c, BuildContext context) {
  return GestureDetector(
    child: Container(
      decoration: BoxDecoration(
          color: CustomColors.getRandomColor(), borderRadius: BorderRadius.circular(Constants.borderRadius)),
      width: 240,
      height: 120,
      padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
      margin: const EdgeInsets.only(right: 12.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Row(
            children: [
              Image.network(
                c.image,
                width: 20,
                fit: BoxFit.cover,
              ),
              const SizedBox(width: 10),
              Flexible(
                child: Text(
                  c.name,
                  maxLines: 2,
                  textAlign: TextAlign.start,
                  style: TextStyles.bodyWhite.copyWith(fontWeight: FontWeight.bold),
                ),
              )
            ],
          ),
          // const SizedBox(height: 24),
          const Spacer(),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, mainAxisSize: MainAxisSize.max, children: [
            Row(
              children: [
                const Icon(Icons.star, color: Colors.amber),
                Text(c.rating.toString(), style: TextStyles.bodyWhite)
              ],
            ),
            Text(
                '${NumberFormat.compactCurrency(
                  decimalDigits: 2,
                  locale: 'en_US',
                  symbol: '',
                ).format(c.numberOfEnrolled)} Learners',
                style: TextStyles.bodyWhite),
          ]),
        ],
      ),
    ),
    onTap: () {
      PersistentNavBarNavigator.pushNewScreen(context, screen: coursePageView(c), withNavBar: false);
    },
  );
}

Widget searchCourseTile(Course c) {
  return Container(
    decoration: BoxDecoration(
        border: Border.all(color: Colors.grey), borderRadius: BorderRadius.circular(Constants.borderRadius)),
    margin: const EdgeInsets.only(bottom: 12, right: 12),
    padding: const EdgeInsets.only(right: 8),
    child: Row(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.network(
            c.image,
            fit: BoxFit.fitHeight,
            height: 108,
            width: 144,
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Column(
            children: [
              Text(
                c.name,
                maxLines: 2,
                textAlign: TextAlign.start,
                overflow: TextOverflow.clip,
                style: TextStyles.bodyBlack.copyWith(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(
                            Icons.star,
                            color: Colors.amber,
                            size: 24,
                          ),
                          const SizedBox(width: 8),
                          Text("4.2", style: TextStyles.bodyBlack),
                        ],
                      ),
                      Text("483 Ratings", style: TextStyles.infoGrey),
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text('4.5k Learners', style: TextStyles.bodyBlack),
                      GestureDetector(
                        onTap: () {},
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 18),
                          margin: const EdgeInsets.symmetric(vertical: 8),
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.grey),
                            color: CustomColors.main,
                            borderRadius: BorderRadius.circular(Constants.borderRadius),
                          ),
                          child: Center(
                            child: Text(
                              'Join',
                              style: TextStyles.bodyWhite.copyWith(fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    ),
  );
}
