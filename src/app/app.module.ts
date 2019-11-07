import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PlanetsComponent } from './modules/components/planets/planets.component';
import { PlanetService } from './shared/services/planet.service';
import { HttpClientModule } from '@angular/common/http'; 
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';
import { MovieService } from './shared/services/movie.service';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PlanetsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot()
    ],
    providers: [
        PlanetService,
        MovieService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}