import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Travel, TravelsResponse } from "../../models/travel.model";
import { map, Observable } from "rxjs";
import { Step } from "../../models/step.model";

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

    getTravelById(id: number): Observable<Travel> {
        return this.http.get<Travel>(
            `${this.baseAPIUrl}/${id}`
        ).pipe(
            map(response => ({
                ...response
            }))
        );
    }

    createTravel(travel: Travel) {
        return this.http.post<Travel>(
            `${this.baseAPIUrl}`,
            travel
        );
    }

    updateTravel(id: number, travel: Travel) {

    }

    deleteTravel(id: number) {
        return this.http.delete(
            `${this.baseAPIUrl}/${id}`
        )
    }

    addStep(travelId: number, step: Step) {
        return this.http.post(
            `${this.baseAPIUrl}/${travelId}/steps`,
            step
        );
    }

    deleteStep(travelId: number, stepId: number) {
        return this.http.delete(
            `${this.baseAPIUrl}/${travelId}/steps/${stepId}`
        )
    }
}