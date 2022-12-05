import 'package:bucademy/classes/event/event.dart';
import 'package:bucademy/resources/custom_colors.dart';
import 'package:bucademy/services/locator.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

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
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(child: Text(viewModel.event!.title)),
                      const Divider(thickness: 1.5),
                      Container(child: Text(viewModel.event!.startDate)),
                      const Divider(thickness: 1.5),
                      Container(child: Text(viewModel.event!.endDate)),
                      const Divider(thickness: 1.5),
                      Container(child: Text(viewModel.event!.description)),
                      const Divider(thickness: 1.5),
                      Container(
                          child: Text(
                              "${viewModel.event!.location[0]}, ${viewModel.event!.location[1]}")),
                      const Divider(thickness: 1.5),
                      Container(child: Text(viewModel.event!.quota.toString())),
                      const Divider(thickness: 1.5),
                      Container(
                          child: Text(
                              viewModel.event!.participantCount.toString())),
                      //Container(child: Text(viewModel.event!.visibility)),
                      //Container(child: Text(viewModel.event!.fee.toString())),
                      //Container(child: Text(viewModel.event!.medium)),
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
}
