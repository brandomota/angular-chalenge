import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './shared/components/home/home.component';
import { PlanetsComponent } from './modules/components/planets/planets.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'planets', component: PlanetsComponent}
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