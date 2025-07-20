import { Routes } from '@angular/router';
import { DocumentComponent } from './pages/document/document.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'document/:id',
        component: DocumentComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];
