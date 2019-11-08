import { Component, OnInit, TemplateRef } from "@angular/core";
import { Starship } from "../../../shared/models/starship.model";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { StarshipService } from "../../../shared/services/starship.service";
import { MovieService } from "../../../shared/services/movie.service";
import { Movie } from "../../../shared/models/movie.model";

@Component({
    selector: 'starships-list',
    templateUrl: './starships.component.html',
    styleUrls: ['./starships.component.scss']
})

export class StarshipsComponent implements OnInit {
   
    public starships: Starship[] = [];
    public totalPerPage = 10;
    public actualPage = 1;
    public totalOfItens = this.starships.length;
    public starshipSelected: Starship;
    public search:string = '';
    public isLoading:boolean = false;
    private modalInstance:BsModalRef;

    constructor(
        private starshipService: StarshipService, 
        private modalService: BsModalService,
        private movieService: MovieService,
        ) { }

    ngOnInit() {
        this.loadStarships();
    }

    private loadStarships(page: number = 1) {
        this.isLoading = true;
        if(this.search.length === 0) {
            this.starshipService.list(page).subscribe((response) => {
                this.isLoading = false;
                this.actualPage = page;
                this.starships = response.results;
                this.totalOfItens = response.count;
            });
        } else {
            this.starshipService.search(this.search,page).subscribe((response) => {
                this.isLoading = false;
                this.actualPage = page;
                this.starships = response.results;
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
        this.loadStarships(event.page);
    }

    public openModal(template: TemplateRef<any>, url: string) {
        this.starshipService.loadUrl(url).subscribe((response) => {
            this.starshipSelected = response;
            this.starshipSelected.movies = this.getMoviesName(response.films);
            this.modalInstance = this.modalService.show(template, { class: 'modal-lg' });
        });
    }

    public closeModal() {
        this.modalInstance.hide();
    }

    public searchByName(word:string) {
        this.isLoading = true;
        this.starshipService.search(word).subscribe((response) => {
            this.isLoading = false;
            this.starships = response.results;
            this.actualPage = 1;
            this.totalOfItens = response.count;
        });
    }

    
}