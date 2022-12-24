import 'package:bucademy/classes/event/event.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/resources/text_styles.dart';
import 'package:bucademy/services/locator.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
import 'package:maps_launcher/maps_launcher.dart';

Widget eventView({required String eventId}) =>
    ViewModelBuilder<EventViewModel>.reactive(
      viewModelBuilder: () => EventViewModel(eventId),
      onModelReady: (model) => model.init(),
      builder: (context, viewModel, child) => Scaffold(
        appBar: AppBar(
          title: Text(viewModel.event?.description ?? ""),
          backgroundColor: CustomColors.main,
        ),
        body: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            viewModel.loading
                ? const Center(child: CircularProgressIndicator())
                : Expanded(
                    child: Column(
                    children: [
                      ListTile(
                          title: const Text('Title'),
                          subtitle: Text(viewModel.event!.title)),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Start date'),
                          subtitle: Text(viewModel.event!.startDate)),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('End date'),
                          subtitle: Text(viewModel.event!.endDate != null
                              ? viewModel.event!.endDate!
                              : 'Not provided.')),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Description'),
                          subtitle: Text(viewModel.event!.description)),
                      const Divider(thickness: 1.5),
                      ListTile(
                        title: const Text('Location'),
                        subtitle: GestureDetector(
                          onTap: () => viewModel.directToMap(
                              viewModel.event!.location['longitude'],
                              viewModel.event!.location['latitude'],
                              viewModel.event!.title),
                          child: Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 6, horizontal: 8),
                              margin: const EdgeInsets.only(top: 10),
                              decoration: BoxDecoration(
                                  color: CustomColors.main,
                                  borderRadius: BorderRadius.circular(10)),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text('Show On Map',
                                      style: TextStyles.bodyWhite),
                                  Icon(
                                    Icons.location_on_outlined,
                                    color: Colors.white,
                                  ),
                                ],
                              )),
                        ),
                      ),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Quota'),
                          subtitle: Text(viewModel.event!.quota != null
                              ? viewModel.event!.quota.toString()
                              : 'Not provided.')),
                      const Divider(thickness: 1.5),
                      ListTile(
                          title: const Text('Registered'),
                          subtitle: Text(
                              viewModel.event!.participantCount.toString())),
                    ],
                  )),
          ],
        ),
      ),
    );

class EventViewModel extends ChangeNotifier {
  final String eventId;
  bool loading = false;
  Event? event;

  EventViewModel(this.eventId);

  init() async {
    loading = true;
    notifyListeners();

    event = await eventService.getEvent(eventId: eventId);
    if (event == null) return;

    loading = false;
    notifyListeners();
  }

  directToMap(latitude, longitude, title) {
    MapsLauncher.launchCoordinates(longitude, latitude, title);
  }
}
