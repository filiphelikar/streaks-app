import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', component: CreateComponent },
];