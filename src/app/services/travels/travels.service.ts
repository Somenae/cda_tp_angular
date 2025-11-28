import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Travel, TravelsResponse } from "../../models/travel.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TravelsService {
    private readonly http = inject(HttpClient);
    private readonly baseAPIUrl = 'http://localhost:3000/api/travels';
    private readonly baseImageURL = 'http://localhost:3000/public/travel_';

    getTravels(): Observable<TravelsResponse> {
        return this.http.get<TravelsResponse>(
            `${this.baseAPIUrl}`
        ).pipe(
            map(response => ({
                ...response
            }))
        );
    }
}