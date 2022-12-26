import 'dart:io';

import 'package:flutter/material.dart';
import 'package:multiple_search_selection/helpers/create_options.dart';
import 'package:bucademy/view/home/homepage.dart';
import 'package:bucademy/view/login/surnameBar.dart';
import 'package:multiple_search_selection/multiple_search_selection.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import '../../services/locator.dart';
import 'package:bucademy/view/login/passwordBar.dart';
import 'emailBar.dart';
import 'login.dart';
import 'nameBar.dart';

// Made use of https://docs.flutter.dev/cookbook/forms/validation.
class RegistrationForm extends StatefulWidget {
  const RegistrationForm({super.key});

  @override
  RegistrationFormState createState() {
    return RegistrationFormState();
  }
}

// Create a corresponding State class.
// This class holds data related to the form.
class RegistrationFormState extends State<RegistrationForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();
  final _viewModel = RegistrationViewModel();

  final _nameController = TextEditingController();
  final _surnameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _checked = false;

  List<String> tags = """History
Science
Technology
Literature
Art
Music
Politics
Economics
Education
Social issues
Health
Psychology
Sociology
Geography
Philosophy
Environmental studies
Business
Law
Medicine
Anthropology
Mathematics
Sports
Environmental science
Public policy
Communication
Language
Theater
Religious studies
Archaeology
Gender studies
Nutrition
Physical education
Computer programming
Astronomy
Biology
Ecology
Geology
Meteorology
Oceanography
Physics
Zoology
Genetics
Marketing
Advertising
Public relations
Sales
Human resources
Management
Finance
Accounting
Entrepreneurship
Investment
Real estate
International relations
Political science
Public administration
Legal studies
Criminology
Forensic science
Criminal justice
Social work
Counseling
Teaching
Early childhood education
Special education
Curriculum and instruction
Educational leadership
Higher education
Student affairs
School counseling
School psychology
Student services
Linguistics
Communication studies
Speech pathology
Audiology
Journalism
Public speaking
Creative writing
Technical writing
Editing
Publishing
Library science
Information science
Archival studies
Museum studies
Art history
Studio art
Photography
Graphic design
Fashion design
Interior design
Landscape design
Theater arts
Film studies
Dance
Music education
Music theory
Aerospace engineering
Agriculture
Architecture
Astrology
Atmospheric science
Biochemistry
Bioinformatics
Biomedical engineering
Biotechnology
Botany
Business administration
Chemical engineering
Chemistry
Civil engineering
Computer engineering
Computer science
Construction management
Cultural studies
Data science
Dentistry
Earth science
Electrical engineering
Emergency management
Engineering
English
Epidemiology
Ethnomusicology
Fine arts
Food science
Gerontology
Health care administration
Health education
Health sciences
Health services administration
Hospitality management
Industrial engineering
Information technology
Landscape architecture
Materials science
Mechanical engineering
Medical technology
Microbiology
Military science
Molecular biology
Nursing
Occupational therapy
Operations management
Optometry
Parks and recreation management
Physical therapy
Pre-law
Public health
Software engineering
Statistics
Supply chain management
Sustainable development
Theology
Tourism management
Translation
Urban planning
Veterinary medicine
Video game design
Visual arts
Web design
Women's studies
Actuarial science
Agricultural business
Agricultural engineering
Agricultural science
Agricultural studies
Animal science
Applied mathematics
Applied physics
Archaeological science
Art education
Art therapy
Athletic training
Aviation
Biomedical science
Biophysics
Business analytics
Business intelligence
Chemical physics
Civil engineering technology
Clinical psychology
Cognitive science
Communication disorders
Computer information systems
Computer science and engineering
Construction engineering
Counseling psychology
Creative writing and literature
Criminal justice and criminology
Cultural anthropology
Data analytics
Dental hygiene
Dental laboratory technology
Dental technology
Developmental psychology
Digital media
Earth and atmospheric science
Ecology and evolutionary biology
Economics and finance
Education and teaching
Electrical engineering technology
Electronic engineering
Emergency medical services
Engineering management
Environmental engineering
Environmental health
Environmental science and studies
Environmental studies and sustainability
Epidemiology and biostatistics
Ethnic studies
Exercise science
Film and television
Financial engineering
Genetic counseling
Geographical information systems
Geospatial technology
Geriatric care management
Gerontology and aging studies
Global studies
Health administration
Health informatics
Health sciences and services
Higher education administration
Homeland security
Hospitality and tourism management
Human development and family studies
Industrial design
Industrial engineering technology
Information security and assurance
Information systems and technology
Ancient civilizations
Animal behavior
Artificial intelligence
Atomic theory
Climate change
Cognitive psychology
Cold War
Cryptography
Economic theories
Education policy
Electromagnetism
Energy sources
Evolution
Global warming
Government systems
Health care policy
History of art
Human anatomy
Marketing strategies
Medical technologies
Medical treatments
Paleontology
Particle physics
Philosophy of science
Political parties
Quantum mechanics
Race and ethnicity
Religious beliefs
Renaissance art
Rock and roll
Social psychology
Space exploration
Supply and demand
The Industrial Revolution
World wars
Gardening
Reading
Cooking
Crafting
Knitting
Crocheting
Sewing
Embroidery
Quilting
Scrapbooking
Origami
Drawing
Painting
Calligraphy
Pottery
Sculpture
Glassblowing
Woodworking
Metalworking
Blacksmithing
Welding
Carpentry
Plumbing
Electrical work
Hiking
Biking
Swimming
Running
Jogging
Yoga
Pilates
Martial arts
Gymnastics
Rock climbing
Surfing
Skateboarding
Snowboarding
Skiing
Ice skating
Ice hockey
Figure skating
Tennis
Racquetball
Squash
Badminton
Basketball
Football
Soccer
Baseball
Softball
Golf
Fishing
Hunting
Camping
Canoeing
Kayaking
Rafting
Scuba diving
Snorkeling
Skydiving
Hang gliding
Paragliding
Kiteboarding
Sailing
Windsurfing
Filmmaking
Video editing
Podcasting
Voice acting
Singing
Songwriting
Music production
DJing
Drumming
Guitar
Piano
Violin
Flute
Saxophone
Clarinet
Trumpet
Trombone
French horn
Baritone
Tuba
Percussion
Acting
Improv
Stand-up comedy
Magic tricks
Jigsaw puzzles
Board games
Video games
Card games
Role-playing games
Chess
Checkers
Go
Backgammon
Birdwatching
Rock collecting
Fossil collecting
Coin collecting
Stamp collecting
Antique collecting
Comic book collecting
Sports card collecting
Trading card games
Model building
Slot car racing
RC cars
Quadcopters
Drones
Model rockets
Kite flying
Frisbee
Boomerangs
Juggling
Unicycling
Yo-yo
Diabolo
Hula hooping
Poi
Fire spinning
Parkour
Free running
Calisthenics
Slacklining
Trampolining
Stunt bike riding
Inline skating
Roller skating
Ice climbing
Bouldering
Mountain climbing
Rappelling
Zip lining
Parachuting
Gliding
Ballooning
Ultralight aircraft
Motorcycling
Dirt biking
Go-kart racing
Horseback riding
Equestrian sports
Polo
Rodeo
Archery
Crossbow
Paintball
Airsoft
Laser tag
Model railroading
Radio-controlled boats
Remote control aircraft
Shooting sports
Crossfit
Weightlifting
Bodybuilding
Powerlifting
Cross-country skiing
Nordic skiing
Snowshoeing
Hockey
Curling
Sledding
Tobogganing
Ice fishing
Snowmobiling
Fat biking
Sleigh rides
Downhill skiing
Freestyle skiing
Ski jumping
Snow tubing
Biathlon
Luge
Skeleton
Bobsled
Freestyle snowboarding
Winter climbing
Snowkiting
Ice yachting
Iceboating
Winter camping
Sled dog racing
Writing
Blogging
Poetry
Screenwriting
Playwriting
Grant writing
Resume writing
Speechwriting
Interpreting
Genealogy
Journaling
Invitation design
Greeting card design
Journal design
Website design
3D modeling
Film scoring
Music composition
Audio engineering
Sound design
Radio hosting
Costuming
Makeup artistry
Prop design
Set design
Lighting design
Directing
Stage managing
Technical theater
Mentalism
Ventriloquism
Puppetry
Circus arts
Acrobatics
Tightrope walking
Fire breathing
Stilt walking
Clowning
Mime
Physical comedy
Improv comedy
Sketch comedy
Stand-up magic
Illusion
Escapology
Sword swallowing
Poultry judging
Beekeeping
Herbalism
Aromatherapy
Essential oils
Flower arranging
Landscaping
Home improvement
Furniture restoration
Wood carving
Jewelry making
Math
Social studies
Grammar
Vocabulary
Composition
Speaking
Listening
Critical thinking
Problem solving
Creativity
Research
Analysis
Synthesis
Evaluation
Application
Comprehension
Interpretation
Social science
Humanities
Religion
Classics
Cybersecurity
Robotics
Astrophysics
Cosmology
Geophysics
Immunology
Virology
Conservation
Wildlife biology
Forestry
Marine biology
Speech therapy
Sports science
Kinesiology
Pharmacy
Recreation
Tourism
Hospitality
Culinary arts
Film and video production
Broadcasting
Costume design
Stage management
Algorithms
Data structures
Computation
Programming languages
Software development
Database systems
Computer architecture
Operating systems
Computer networks
Data communication
Cloud computing
Internet of Things
Mobile computing
Distributed systems
Parallel computing
Grid computing
Cluster computing
High-performance computing
Machine learning
Deep learning
Neural networks
Natural language processing
Computer vision
Data mining
Information retrieval
Big data
Data engineering
Network security
Information security
Application security
Cloud security
Internet security
Database security
System security
Mobile security
IoT security
Computer forensics
Ethical hacking
Penetration testing
Vulnerability assessment
Risk management
Compliance
Governance
Data privacy
Web development
Business skills
Project management
Creative skills
Educational technology
Health and wellness
Personal development
Language learning
Data visualization
Computer graphics
Game development
Virtual reality
Augmented reality
3D printing
Blockchain
Cryptocurrency
Legal issues
Social media
Digital marketing
Branding
Customer service
Negotiation
Leadership
Team building
Communication skills
Time management
Goal setting
Productivity
Stress management
Innovation
Decision making
Baking
DIY home improvement
Weaving
Ceramics
Magic
Card tricks
Coin tricks
Escape artistry
Lock picking
Sleight of hand
Collecting
Antiques
Comics
Stamps
Coins
Trading cards
Sports memorabilia
Models
Legos
Puzzles
Crossword puzzles
Sudoku
Word search
Cryptograms
Scrabble
Othello
Reversi
Chinese checkers
Poker
Blackjack
Slots
Roulette
Craps
Baccarat
Bingo
Lotto
Keno
Rummy
Spades
Backpacking
Mountain biking
Road cycling
BMX
Rollerblading
Wakeboarding
Kitesurfing
Stand-up paddleboarding
Yachting
Jet skiing
Water skiing
Snow skiing
Alpine skiing
Table tennis
Fencing
Judo
Karate
Taekwondo
Kung fu
Muay Thai
Kickboxing
Boxing
Brazilian jiu-jitsu
Mixed martial arts
Wrestling
CrossFit
Zumba
Aerobics
Dance fitness
Boot camp
HIIT
Cardio
Strength training
Stretching
Mediation
Mindfulness
Qi gong
Tai chi
Aikido
Elementary education
Middle school education
High school education
Adult educations
Language arts
Spelling
Phonics
Handwriting
Geometry
Algebra
Trigonometry
Calculus
Probability
Civics
Government
Ethics
World languages
French
Spanish
German
Italian
Chinese
Japanese
Korean
Arabic
Russian
Portuguese
Latin
Greek
English as a second language
Arts & Crafts
Fashion Design
Turkish
Baking
Bread
Cookies
Cake
Pastries
Dessert
Cooking
"""
      .split('\n');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: SingleChildScrollView(
          // thanks to https://stackoverflow.com/questions/51774252/bottom-overloaded-by-213-pixels-in-flutter
          child: Container(
              child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(padding: EdgeInsets.only(bottom: 80.0)),
              Container(
                  alignment: Alignment.center,
                  height: 200,
                  child: Image.network(
                      'https://raw.githubusercontent.com/bounswe/bounswe2022group3/master/app/client/public/education.png')),
              const Padding(padding: EdgeInsets.only(bottom: 20.0)),
              Form(
                  key: _formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      nameBar(_nameController),
                      surnameBar(_surnameController),
                      emailBar(_emailController),
                      passwordBar(_passwordController),
                      MultipleSearchSelection<String>.creatable(
                        title: const Padding(
                          padding: EdgeInsets.all(12.0),
                          child: Text(
                            'Interests',
                          ),
                        ),
                        onItemAdded: (c) {},

                        createOptions: CreateOptions(
                          createItem: (text) {
                            return text;
                          },
                          createItemBuilder: (text) => Align(
                            alignment: Alignment.centerLeft,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Text('Create "$text"'),
                            ),
                          ),
                          pickCreatedItem: true,
                        ),
                        items: tags, // List<Country>
                        fieldToCheck: (c) {
                          return c;
                        },
                        itemBuilder: (tag) {
                          return Padding(
                            padding: const EdgeInsets.all(6.0),
                            child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(6),
                                color: Colors.white,
                              ),
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 20.0,
                                  horizontal: 12,
                                ),
                                child: Text(tag),
                              ),
                            ),
                          );
                        },
                        pickedItemBuilder: (tag) {
                          return Container(
                            decoration: BoxDecoration(
                              color: Colors.white,
                              border: Border.all(color: Colors.grey[400]!),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(8),
                              child: Text(tag),
                            ),
                          );
                        },
                        sortShowedItems: true,
                        sortPickedItems: true,
                        selectAllButton: Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.blue),
                            ),
                            child: const Padding(
                              padding: EdgeInsets.all(8.0),
                              child: Text(
                                'Select All',
                              ),
                            ),
                          ),
                        ),
                        clearAllButton: Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.red),
                            ),
                            child: const Padding(
                              padding: EdgeInsets.all(8.0),
                              child: Text(
                                'Clear All',
                              ),
                            ),
                          ),
                        ),
                        fuzzySearch: FuzzySearch.jaro,
                        itemsVisibility: ShowedItemsVisibility.alwaysOn,
                        showSelectAllButton: true,
                        maximumShowItemsHeight: 200,
                      ),
                      Row(children: [
                        Checkbox(
                          value: _checked,
                          onChanged: (bool? value) {
                            setState(() {
                              _checked = value!;
                            });
                          },
                        ),
                        const Text(
                            'I agree to the Terms of Use and Privacy Policy.'),
                      ]),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 16.0),
                        child: ElevatedButton(
                          onPressed: () async {
                            // Validate returns true if the form is valid, or false otherwise.
                            if (_formKey.currentState!.validate()) {
                              bool registered = await userService.register(
                                  name: _nameController.text,
                                  surname: _surnameController.text,
                                  email: _emailController.text,
                                  password: _passwordController.text,
                                  agreement: _checked,
                                  tags: tags,
                                  context: context);
                              if (registered) {
                                _viewModel.navigateToLogin(context);
                              } /*else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text( 'Registration failed.')),
                                );
                              }*/
                            }
                          },
                          child: const Text('Register'),
                        ),
                      ),
                    ],
                  )),
              GestureDetector(
                child: Container(
                  alignment: Alignment.center,
                  child: const Text(
                    'Already have an account? Log in',
                  ),
                ),
                onTap: () => _viewModel.navigateToLogin(context),
              ),
            ],
          )),
        ));
  }
}

// ViewModel
class RegistrationViewModel extends ChangeNotifier {
  bool isLoading = false;

  void navigateToLogin(BuildContext context) {
    Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(
            builder: (context) => LoginFormState().build(context)),
        (route) => false);
  }

  void navigateToHomepage(BuildContext context) {
    PersistentNavBarNavigator.pushNewScreen(context, screen: homepageView());
  }
}
