import { Routes } from '@angular/router';
import { Main } from './main/main';
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
import { Teacherviewstudents } from './teacherviewstudents/teacherviewstudents';
import { Viewresults } from './viewresults/viewresults';
import { Viewteachers } from './viewteachers/viewteachers';
import { Viewattendance } from './viewattendance/viewattendance';
import { Addstudents } from './addstudents/addstudents';
import { Reqleave } from './reqleave/reqleave';
import { Viewleave } from './viewleave/viewleave';
import { Viewadmins } from './viewadmins/viewadmins';
import { Adminsidebar } from './adminsidebar/adminsidebar';
import { Teachersidebar } from './teachersidebar/teachersidebar';
import { Studentsidebar } from './studentsidebar/studentsidebar';
import { authGuard } from './services/auth.guard';


export const routes: Routes = [

    {
        path: "main",
        component: Main
    },
    {
        path: "",
        redirectTo: "main",
        pathMatch: "full"
    },
    {
        path: "footer",
        component: Footer
    },
    {
        path: "admin",
        component: Admin,
        canActivate: [authGuard]
    },
    {
        path: "teacher",
        component:Teacher,
        canActivate: [authGuard]
    },
    {
        path: "student",
        component: Student,
        canActivate: [authGuard]
    },
    {
        path: "registration",
        component: Registration
    },
    {
        path: "addteacher",
        component: Addteacher,
        canActivate: [authGuard]
    },
    {
        path: "addadmin",
        component: Addadmin,
        canActivate: [authGuard]
    },
    {
        path: "addstudents",
        component: Addstudents,
        canActivate: [authGuard]
    },
    {
        path: "assignteachers",
        component: Assignteacher,
        canActivate: [authGuard]
    },
    {
        path: "createclass",
        component: Createclass,
        canActivate: [authGuard]   
    },
    {
        path: "markattendance",
        component: Markattendance,
        canActivate: [authGuard]
    },
    {
        path: "attendancereport",
        component: Attendancereport,
        canActivate: [authGuard]
    },
    {
        path: "entermarks",
        component: Entermarks,
        canActivate: [authGuard]
    },
    {
        path: "viewstudents",
        component: Viewstudents,
        canActivate: [authGuard]
    },
    {
        path: "teacherviewstudents",
        component: Teacherviewstudents,
        canActivate: [authGuard]
    },
    {
        path: "viewresults",
        component: Viewresults,
        canActivate: [authGuard]
    },
    {
        path: "viewteachers",
        component: Viewteachers,
        canActivate: [authGuard]
    },
    {
        path: "viewadmins",
        component: Viewadmins,
        canActivate: [authGuard]
    },
    {
        path: "viewattendance",
        component: Viewattendance,
        canActivate: [authGuard]
    },

    {
        path: "reqleave",
        component: Reqleave,
        canActivate: [authGuard]
    },
    {
        path: "viewleave",
        component: Viewleave,
        canActivate: [authGuard]
    },
    {
        path: "adminsidebar",
        component: Adminsidebar,
        canActivate: [authGuard]
    },
    {
        path: "teachersidebar",
        component: Teachersidebar,
        canActivate: [authGuard]
    },
    {
        path: "studentsidebar",
        component: Studentsidebar,
        canActivate: [authGuard]
    },
    {
        path: "student",
        component: Student,
        canActivate: [authGuard]
    }

];
