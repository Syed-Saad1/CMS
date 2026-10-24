import {
  Award,
  Calendar,
  CircleCheckBig,
  CopyCheck,
  FileEdit,
  FileText,
  FolderPlus,
  GraduationCap,
  IdCard,
  NotebookPen,
  User,
  UserCog,
} from "lucide-react";

// export const AdminDashboardCard = [
//   {
//     iconclass: "bg-[#FFFAEE] dark:bg-[#E29200]/10",
//     iconcolor: "text-[#E29200]",
//     id: "user",
//     icon: User,
//     des: "Total Users",
//     title: "1,502",
//   },
//   {
//     iconclass: "bg-[#ECFAF1] dark:bg-[#81CDA5]/10",
//     iconcolor: "text-[#81CDA5]",
//     id: "teacher",
//     icon: IdCard,
//     des: "Total Teacher",
//     title: "40",
//   },
//   {
//     iconclass: "bg-[#F7F1FF] dark:bg-[#B289ED]/10",
//     iconcolor: "text-[#B289ED]",

//     id: "courses",
//     icon: FileText,
//     des: "Total Courses",
//     title: "156",
//   },
//   {
//     iconclass: "bg-[#FFFAEE] dark:bg-[#E29200]/10",
//     iconcolor: "text-[#E29200]",
//     id: "enroll",
//     icon: CopyCheck,
//     des: "Total Enrollments",
//     title: "324",
//   },
// ];

export const ButtonNavigate = [
  {
    id: "createcourse",
    variant: "button",
    icon: FolderPlus,
    buttonclass: "bg-[#336AFB]",
    iconcolor: "text-white",
    buttontext: "Create Course",
  },
  {
    id: "managecourse",
    variant: "button",
    icon: NotebookPen,
    buttonclass:
      "bg-transparent hover:bg-transparent transition-shadow duration-300 hover:shadow-[inset_0_25px_50px_-12px_rgb(0_0_0_/_.25)] border-1 border-[#336AFB] text-[#336AFB]",
    iconcolor: "text-[#336AFB]",
    buttontext: "Manage Course",
  },
  {
    id: "manageuser",
    variant: "button",
    icon: UserCog,
    buttonclass:
      "bg-transparent border-border text-gray-400 hover:bg-transparent",
    iconcolor: "text-gray-400",
    buttontext: "Manage Users",
  },
];

export const CoursesCard = [
  {
    id: "WebDev",
    titleD: "bg-[#E6E4FF]! text-[#5247A9]!",
    title: "WEB DEV",
    coursename: "Advance JS",
    avatar: "/Web.png",
    teacher: "Sir. Salman Raza",
    numenroll: "14",
    enrolltitle: "Enrolled",
  },

  {
    id: "DS",
    titleD: "bg-[#D9E8FE]! text-[#798496]!",
    title: "DATA SCIENCE",
    coursename: "Data Science",
    avatar: "/DS.png",
    teacher: "Eng. Sohail",
    numenroll: "2",
    enrolltitle: "Enrolled",
  },
  {
    id: "Design",
    titleD: "!",
    title: "DESIGN",
    coursename: "Ui Ux Designing",
    avatar: "/UiUx.png",
    teacher: "Sir. Ali Khan",
    numenroll: "6",
    enrolltitle: "Enrolled",
  },
  {
    id: "IF",
    titleD: "bg-[#D8DADC]! text-[#C0863B]!",
    title: "INFRASTRUCTURE",
    coursename: "Cloud Computer",
    avatar: "/CC.png",
    teacher: "Miss. Jantar",
    numenroll: "0",
    enrolltitle: "No enrollment",
  },
  {
    id: "CIT",
    titleD: "bg-[#D8DADC]! text-[#C0863B]!",
    title: "Basic Computer",
    coursename: "Certificate Information Technology",
    avatar: "/CC.png",
    teacher: "Sir Owais Raza",
    numenroll: "70",
    enrolltitle: "Enrollments",
  },
  {
    id: "De",
    titleD: "bg-[#D8DADC]! text-[#C0863B]!",
    title: "Desiging",
    coursename: "Graphics Design",
    avatar: "/CC.png",
    teacher: "Sir Faizan ",
    numenroll: "12",
    enrolltitle: "Enrollment",
  },
];

export const WhatWillLearn = [
  {
    id: "1",
    content:
      "how to build websites by mastering essential core programming languages, modern tools, and deployment techniques",
  },
  {
    id: "2",
    content: "Learn HTML to structure web page content, headings, and lists.",
  },
  {
    id: "3",
    content:
      "Use CSS and frameworks like Bootstrap for styling and responsive layouts.",
  },
  {
    id: "4",
    content:
      "Master JavaScript to add dynamic user interactivity and handle DOM manipulation.",
  },
  {
    id: "5",

    content:
      "Build server-side logic using Node.js or Python.Manage data using relational and non-relational databases like SQL or MongoDB.",
  },
  {
    id: "6",
    content:
      "Use version control with Git to manage code changes and collaborate with other developers.",
  },
];

export const DeletePoints = [
  {
    id: "Rule1",
    icon: CircleCheckBig,
    title: "Your Profile and Personal Information will be deleted.",
  },
  {
    id: "Rule2",
    icon: CircleCheckBig,
    title: "All Your Courses Messages and Filed Removed.",
  },
  {
    id: "Rule3",
    icon: CircleCheckBig,
    title: "You Will not able to long term acces this account.",
  },
  {
    id: "Rule4",
    icon: CircleCheckBig,
    title: "Check all things this action Cann't be undone.",
  },
];
