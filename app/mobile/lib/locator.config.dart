import 'package:bucademy/services/annotation_service.dart';
import 'package:bucademy/services/course_service.dart';
import 'package:bucademy/services/content_service.dart';
import 'package:bucademy/services/dio_service.dart';
import 'package:bucademy/services/discussion_service.dart';
import 'package:bucademy/services/navigator_service.dart';
import 'package:bucademy/services/note_service.dart';
import 'package:bucademy/services/persistence_service.dart';
import 'package:bucademy/services/profile_service.dart';
import 'package:bucademy/services/user_service.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

GetIt $initGetIt(
  GetIt get, {
  String? environment,
  EnvironmentFilter? environmentFilter,
}) {
  final gh = GetItHelper(get, environment, environmentFilter);
  gh.lazySingleton<CourseService>((() => CourseService()));
  gh.lazySingleton<NavigatorService>((() => NavigatorService()));
  gh.lazySingleton<PersistenceService>((() => PersistenceService()));
  gh.lazySingleton<DioService>((() => DioService()));
  gh.lazySingleton<UserService>((() => UserService()));
  gh.lazySingleton<DiscussionService>((() => DiscussionService()));
  gh.lazySingleton<MockContentService>((() => MockContentService()));
  gh.lazySingleton<ProfileService>((() => ProfileService()));
  gh.lazySingleton<AnnotationService>((() => AnnotationService()));
  gh.lazySingleton<NoteService>((() => NoteService()));

  return get;
}
