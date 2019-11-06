import { Injector } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export class BaseService<T> {

    protected http: HttpClient;
    protected base_url: string;
    
    constructor(protected url: string, protected injector: Injector){
        this.http = injector.get(HttpClient);
        this.base_url = url;
    }

    public list():Observable<T[]> {
        return this.http.get<T[]>(this.url);
    }

    public get(id: number):Observable<T> {
        return this.http.get<T>(`${this.base_url}${id}`);
    }

    public search(word:string):Observable<T[]> {
        return this.http.get<T[]>(`${this.base_url}/?search=${word}`)
    }
}