import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Admin } from './admin/admin';
import { Teacher } from './teacher/teacher';
import { Student } from './student/student';
import { Registration } from './registration/registration';

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
    }
];
