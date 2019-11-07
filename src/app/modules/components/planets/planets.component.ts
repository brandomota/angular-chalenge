import { Component, OnInit, TemplateRef } from '@angular/core';
import { PlanetService } from '../../../shared/services/planet.service';
import { Planet } from '../../../shared/models/planet.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MovieService } from '../../../shared/services/movie.service';
import { Movie } from '../../../shared/models/movie.model';

@Component({
    selector: 'planets-list',
    templateUrl: './planets.component.html',
    styleUrls: ['./planets.component.scss']
})

export class PlanetsComponent implements OnInit {

    public planets: Planet[] = [];
    public totalPerPage = 10;
    public actualPage = 1;
    public totalOfItens = this.planets.length;
    public planetSelected: Planet;
    public search:string = '';
    public isLoading:boolean = false;
    private modalInstance:BsModalRef;

    constructor(
        private planetService: PlanetService, 
        private modalService: BsModalService,
        private movieService: MovieService,
        ) { }

    ngOnInit() {
        this.loadPlanets();
    }

    private loadPlanets(page: number = 1) {
        this.isLoading = true;
        if(this.search.length === 0) {
            this.planetService.list(page).subscribe((response) => {
                this.isLoading = false;
                this.actualPage = page;
                this.planets = response.results;
                this.totalOfItens = response.count;
            });
        } else {
            this.planetService.search(this.search,page).subscribe((response) => {
                this.isLoading = false;
                this.actualPage = page;
                this.planets = response.results;
                this.totalOfItens = response.count;
            });
        }
    }

    private getMoviesName(urlMovies: string[]) {
        let allMovies:Movie[] = [];

        urlMovies.forEach(url => {
            this.movieService.loadUrl(url).subscribe((response:Movie) => {
                allMovies.push(response);
            });
        });
        return allMovies;
    }

    public changePage(event: any) {
        this.loadPlanets(event.page);
    }

    public openModal(template: TemplateRef<any>, url: string) {
        this.planetService.loadUrl(url).subscribe((response) => {
            this.planetSelected = response;
            this.planetSelected.movies = this.getMoviesName(response.films);
            this.modalInstance = this.modalService.show(template, { class: 'modal-lg' });
        });
    }

    public closeModal() {
        this.modalInstance.hide();
    }

    public searchByName(word:string) {
        this.isLoading = true;
        this.planetService.search(word).subscribe((response) => {
            this.isLoading = false;
            this.planets = response.results;
            this.actualPage = 1;
            this.totalOfItens = response.count;
        });
    }
}