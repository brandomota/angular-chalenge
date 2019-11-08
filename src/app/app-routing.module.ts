import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/components/home/home.component';
import { PlanetsComponent } from './modules/components/planets/planets.component';
import { MoviesComponent } from './modules/components/movies/movies.component';
import { StarshipsComponent } from './modules/components/starships/starships.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'planets', component: PlanetsComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'starships', component: StarshipsComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}