import { Component, inject, OnInit, signal } from "@angular/core";
import { TravelsService } from "../../services/travels/travels.service";
import { Travel, TravelsResponse } from "../../models/travel.model";

@Component({
    selector: 'app-travels',
    imports: [],
    templateUrl: './travels.component.html',
    styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit {
    private readonly travelsService = inject(TravelsService);

    protected travels = signal<Travel[]>([]);

    ngOnInit(): void {
        this.loadTravels();
    }

    loadTravels() {
        this.travelsService.getTravels().subscribe({
            next: (response) => {
                this.travels.set(Object.values(response));
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}