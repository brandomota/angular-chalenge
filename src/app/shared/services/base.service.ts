import { Injector } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export class BaseService<T> {

    protected http: HttpClient;
    protected base_url: string;

    constructor(protected url: string, protected injector: Injector) {
        this.http = injector.get(HttpClient);
        this.base_url = url;
    }

    public list(page: number = 1): Observable<any> {

        if (page > 1) {
            return this.http.get<any>(`${this.url}?page=${page}`);

        } else {
            return this.http.get<any>(this.url);

        }
    }

    public loadUrl(url:string): Observable<T> {
        return this.http.get<T>(`${url}`);
    }

    public search(word: string): Observable<any> {
        return this.http.get<any>(`${this.base_url}?search=${word}`)
    }
}