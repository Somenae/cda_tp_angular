import { Component, computed, inject, input, output, signal } from "@angular/core";
import { Travel } from "../../models/travel.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { selectTravels } from "../../store/selectors/travels.selectors";
import { StepsComponent } from "../steps/steps.component";
import { TravelsService } from "../../services/travels/travels.service";

@Component({
    selector: 'app-travel',
    imports: [StepsComponent],
    templateUrl: './travels.component.html',
    styleUrls: ['./travels.component.css']
})
export class TravelsComponent {
    travelId = input.required<number>();
    travel = input.required<Travel>();
    protected readonly travels = signal<Travel[]>([]);
    protected readonly steps = computed(() => {
        return this.travel()?.steps || [];
    });

    stepDeleteId = output<number>();
    
    private store = inject(Store<AppState>);
    private travelsService = inject(TravelsService);
    
    constructor() {
        /* this.store.select(selectTravels).subscribe(travels => {
            this.travels.set(travels);
        }); */
    }

    deleteStep(stepId: number) {
        this.stepDeleteId.emit(stepId);
    }
}