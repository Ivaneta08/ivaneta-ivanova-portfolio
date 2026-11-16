// Section 4: Projects.
// To add a project, copy one { ... } block (including the comma after it) and change the text.
// To remove a project, delete its { ... } block.
//
// image:       path to a picture in img/projects/ (use "" for no picture)
// description: one string, or a list of strings (one per paragraph)
// points:      optional bullet list (use [] for none)
// links:       list of { label, url }; use [] if the project has no link
content.projects = [
  {
    title: "Electrical Energy Monitoring and Analysis System",
    dates: "10/2026 – current",
    image: "",
    description: "A web application for collecting, storing, processing, and visualizing data from smart power meters in the form of tables and charts.",
    points: [
      "Periodic data collection from electricity meters",
      "Generation of statistics for specific periods",
      "Definition of virtual electricity meters",
      "Monitoring: alerts and identification of missing data intervals",
      "Data export capability for monthly summary reports"
    ],
    links: [
      { label: "GitHub", url: "https://github.com/Ivaneta08/Electrical_Energy_Monitoring_and_Analysis_System" }
    ]
  },
  {
    title: "Drawy",
    dates: "04/2026 – 10/2026",
    image: "img/projects/Drawy.jpg",
    description: [
      "An embedded project: a platform for pixel drawing in a 32x32 grid. You can draw, select a color using the color wheel, adjust the brightness and save or load images. Via Wi-Fi, the image is transmitted in real time to an ESP32 controller that controls four 8x8 RGB LED matrices.",
      "Showcased at the TUESfest open day, further developed as part of the ArtScienceTech Lab initiative and featured at the 38th edition of the Computer Space international computer art forum."
    ],
    points: [],
    links: [
      { label: "GitHub", url: "https://github.com/bananateo/Drawy" },
      { label: "Computer Space", url: "https://computerspace.org/" }
    ]
  },
  {
    title: "HackTUES 12 - LifeCore",
    dates: "03/2026",
    image: "img/projects/LifeCore.jpg",
    description: "An embedded team project developed for the hackathon HackTUES 12: a wearable navigation assistant for the blind that uses an ultrasonic sensor and buzzer for real-time feedback, with sensitivity controlled via a potentiometer. Combined with a web dashboard with text-to-speech and a community center where users can share tips and experiences.",
    points: [],
    links: [
      { label: "GitHub", url: "https://github.com/MartinValentinov/CoreSix-HackTues12" }
    ]
  },
  {
    title: "EcoCity",
    dates: "03/2026 – 05/2026",
    image: "",
    description: "A city-builder game where the player starts with a small city and their goal is to develop it, with a focus on the ecological aspect. The challenge is to balance different resources and emission levels: if emissions get too high or any resource reaches 0, the game ends.",
    points: [],
    links: [
      { label: "GitHub", url: "https://github.com/TUES-2026-PBL-11-klas/Master-P2-EcoCity" }
    ]
  },
  {
    title: "Two versions of a Console Chess game",
    dates: "12/2025 – 01/2026",
    image: "",
    description: "A chess game that runs in the console, first written in Java and then in C++. It supports standard chess rules, check, mate and stalemate, castling, en passant and pawn promotion, saving and loading a game, undo, offering a draw and resigning, stress testing with .pgn files in Java and unit tests in C++.",
    points: [],
    links: [
      { label: "GitHub (Java)", url: "https://github.com/OOP-11A-2025-2026/Krovat-Console-Chess/tree/main" },
      { label: "GitHub (C++)", url: "https://github.com/OOP-11A-2025-2026/Krovat-Console-Chess-The-Second" }
    ]
  },
  {
    title: "Tournament System",
    dates: "11/2025 – 12/2025",
    image: "",
    description: "Backend of a tournament system. Uses the Double Elimination format: there is a winners stream and a losers stream.",
    points: [],
    links: [
      { label: "GitHub", url: "https://github.com/OOP-11A-2025-2026/Krovat-Tournament-System" }
    ]
  },
  {
    title: "Hack TUES 10 and TUES fest - Secrets of the Deep",
    dates: "04/2024",
    image: "",
    description: "A game developed for the HackTUES hackathon and presented at the TUESfest open house. The main character is a diver who sees the Golden fish and sets out to photograph the legendary animal, meeting many interesting sea creatures along the way, some of which are not very friendly.",
    points: [],
    links: [
      { label: "GitHub", url: "https://github.com/KristiyanKobarelov/VIKTM---Hack-TUES" }
    ]
  }
];
