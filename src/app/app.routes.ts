import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TravelsDetailsComponent } from './pages/travel-details/travel-details.component';

export const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        title: 'Liste des voyages'
    },
    {
        path: 'travel/:id',
        component: TravelsDetailsComponent,
    },
    {
        path: '**',
        redirectTo: ''
    },
];
