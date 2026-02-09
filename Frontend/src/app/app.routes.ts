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
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "teacher",
        component: Teacher,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },
    {
        path: "student",
        component: Student,
        canActivate: [authGuard],
        data: { roles: ['Student'] }
    },
    {
        path: "registration",
        component: Registration
    },
    {
        path: "addteacher",
        component: Addteacher,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "addadmin",
        component: Addadmin,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "addstudents",
        component: Addstudents,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },
    {
        path: "assignteachers",
        component: Assignteacher,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "createclass",
        component: Createclass,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "markattendance",
        component: Markattendance,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },
    {
        path: "attendancereport",
        component: Attendancereport,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },
    {
        path: "entermarks",
        component: Entermarks,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },
    {
        path: "viewstudents",
        component: Viewstudents,
        canActivate: [authGuard],
        data: { roles: ['Teacher', 'Admin'] }
    },
    {
        path: "teacherviewstudents",
        component: Teacherviewstudents,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },
    {
        path: "viewresults",
        component: Viewresults,
        canActivate: [authGuard],
        data: { roles: ['Student'] }
    },
    {
        path: "viewteachers",
        component: Viewteachers,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "viewadmins",
        component: Viewadmins,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "viewattendance",
        component: Viewattendance,
        canActivate: [authGuard],
        data: { roles: ['Student'] }
    },

    {
        path: "reqleave",
        component: Reqleave,
        canActivate: [authGuard],
        data: { roles: ['Student'] }
    },
    {
        path: "viewleave",
        component: Viewleave,
        canActivate: [authGuard],
        data: { roles: ['Teacher', 'Admin'] }
    },
    {
        path: "adminsidebar",
        component: Adminsidebar,
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: "teachersidebar",
        component: Teachersidebar,
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },
    {
        path: "studentsidebar",
        component: Studentsidebar,
        canActivate: [authGuard],
        data: { roles: ['Student'] }
    }


];

