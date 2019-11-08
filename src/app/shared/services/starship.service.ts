import { BaseService } from './base.service';
import { Injectable, Injector } from '@angular/core';
import { BASE_URL } from '../../environment/enviroments';

@Injectable({
    providedIn: 'root'
})

export class StarshipService extends BaseService<any> {
    constructor(public injector: Injector){
        super(`${BASE_URL}starships/`, injector);
    }
}
