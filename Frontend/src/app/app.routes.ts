import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Admin } from './admin/admin';
import { Teacher } from './teacher/teacher';
import { Student } from './student/student';
import { Registration } from './registration/registration';
import { Addteacher } from './addteacher/addteacher';
import { Addadmin } from './addadmin/addadmin';
import { Assignteacher } from './assignteacher/assignteacher';
import { Createclass } from './createclass/createclass';
import { Markattendance } from './markattendance/markattendance';
import { Attendancereport } from './attendancereport/attendancereport';
import { Entermarks } from './entermarks/entermarks';
import { Viewstudents } from './viewstudents/viewstudents';
import { Viewresults } from './viewresults/viewresults';
import { Viewteachers } from './viewteachers/viewteachers';
import { Viewattendance } from './viewattendance/viewattendance';
import { Addstudents } from './addstudents/addstudents';
import { Reqleave } from './reqleave/reqleave';
import { Viewleave } from './viewleave/viewleave';
import { Adminsidebar } from './adminsidebar/adminsidebar';
import { Teachersidebar } from './teachersidebar/teachersidebar';
import { Studentsidebar } from './studentsidebar/studentsidebar';

export const routes: Routes = [

    {
        path: "main",
        component: Main
    },
    {
        path: "",
        redirectTo: "main",
        pathMatch: "full"
    }, {
        path: "navbar",
        component: Navbar
    },
    {
        path: "footer",
        component: Footer
    },
    {
        path: "admin",
        component: Admin
    },
    {
        path: "teacher",
        component:Teacher
    },
    {
        path: "student",
        component: Student
    },
    {
        path: "registration",
        component: Registration
    },
    {
        path: "addteacher",
        component: Addteacher
    },
    {
        path: "addadmin",
        component: Addadmin
    },
    {
        path: "addstudents",
        component: Addstudents
    },
    {
        path: "assignteachers",
        component: Assignteacher
    },
    {
        path: "createclass",
        component: Createclass   
    },
    {
        path: "markattendance",
        component: Markattendance
    },
    {
        path: "attendancereport",
        component: Attendancereport
    },
    {
        path: "entermarks",
        component: Entermarks
    },
    {
        path: "viewstudents",
        component: Viewstudents
    },
    {
        path: "viewresults",
        component: Viewresults,
    },
    {
        path: "viewteachers",
        component: Viewteachers
    },
    {
        path: "viewattendance",
        component: Viewattendance
    },
    {
        path: "reqleave",
        component: Reqleave
    },
    {
        path: "viewleave",
        component: Viewleave
    },
    {
        path: "adminsidebar",
        component: Adminsidebar
    },
    {
        path: "teachersidebar",
        component: Teachersidebar
    },
    {
        path: "studentsidebar",
        component: Studentsidebar
    }

];
