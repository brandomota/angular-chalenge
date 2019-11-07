import { BaseService } from "./base.service";
import { Injector, Injectable } from "@angular/core";
import { BASE_URL } from "../../environment/enviroments";

@Injectable({
    providedIn: 'root'
})

export class MovieService extends BaseService<any> {
    constructor(public injector: Injector) {
        super(`${BASE_URL}films/`, injector)
    }
}