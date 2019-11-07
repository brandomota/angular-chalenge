import { Component, OnInit, TemplateRef } from "@angular/core";
import { Movie } from "../../../shared/models/movie.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { MovieService } from "../../../shared/services/movie.service";
import { Planet } from "../../../shared/models/planet.model";
import { PlanetService } from "../../../shared/services/planet.service";

@Component({
    selector: 'movies-list',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
    public movies: Movie[] = [];
    public totalPerPage = 10;
    public actualPage = 1;
    public totalOfItens = this.movies.length;
    public movieSelected:Movie;
    public search:string = '';
    public isLoading:boolean = false;
    private modalInstance:BsModalRef;

    constructor(
        private movieService: MovieService,
        private modalService: BsModalService,
        private planetService: PlanetService
    ){}

    ngOnInit() {
        this.loadMovies();
    }

    private loadMovies(page: number = 1) {
        this.isLoading = true;
        if(this.search.length === 0) {
            this.movieService.list(page).subscribe((response) => {
                this.isLoading = false;
                this.actualPage = page;
                this.movies = response.results;
                this.totalOfItens = response.count;
            });
        } else {
            this.movieService.search(this.search,page).subscribe((response) => {
                this.isLoading = false;
                this.actualPage = page;
                this.movies = response.results;
                this.totalOfItens = response.count;
            });
        }
    }

    private getPlanetsName(urlsPlanets: string[]) {
        let allPlanets: Planet[] = [];

        urlsPlanets.forEach((url) => {
            this.planetService.loadUrl(url).subscribe((response) => {
                allPlanets.push(response);
            });
        });

        return allPlanets;
    }

    public changePage(event: any) {
        this.loadMovies(event.page);
    }

    public openModal(template: TemplateRef<any>, url:string) {
        this.movieService.loadUrl(url).subscribe((response) => {
            this.movieSelected = response;
            this.movieSelected.planets = this.getPlanetsName(response.planets);
            this.modalInstance = this.modalService.show(template, {class: 'modal-lg'});
        });
    }

    public closeModal() {
        this.modalInstance.hide();
    }

    public searchByName(word:string) {
        this.isLoading = true;
        this.movieService.search(word).subscribe((response) => {
            this.isLoading = false;
            this.movies = response.results;
            this.actualPage = 1;
            this.totalOfItens = response.count;
        })
    }
}