import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { Travel } from "../../models/travel.model";
import { TravelsComponent } from "../../component/travels/travels.component";
import { TravelsService } from "../../services/travels/travels.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Step } from "../../models/step.model";

@Component({
    selector: 'app-travel-details',
    imports: [TravelsComponent, ReactiveFormsModule],
    templateUrl: './travel-details.component.html',
    styleUrls: ['./travel-details.component.css'],
})
export class TravelsDetailsComponent implements OnInit {
    protected readonly travelId = signal<number | null>(null);
    protected readonly travels = signal<Travel[]>([]);

    protected readonly travel = signal<Travel | null>(null);

    private readonly route = inject(ActivatedRoute);
    private store = inject(Store<AppState>);
    private readonly travelsService = inject(TravelsService);

    private fb = inject(FormBuilder);
    
    public stepForm: FormGroup;

    constructor() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            const idNumber = parseInt(id, 10);
            if (!isNaN(idNumber)) {
                this.travelId.set(idNumber);
            };
        };

        /* this.store.select(selectTravels).subscribe(travels => {
            this.travels.set(travels);
        }); */

        this.stepForm = this.fb.group({
            name: ['', [Validators.required]],
            order: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.loadTravel();
    }

    loadTravel() {
        const id = this.travelId();
        if(id !== null) {
            const travel = this.travelsService.getTravelById(this.travelId()!).subscribe({
                next: (response) => {
                    this.travel.set(response);
                }
            });
        }
    }

    addStep(travelId: number) {
        if (this.stepForm.valid) {
            const formValue = this.stepForm.value;
            const newStep: Step = {
                name: formValue.name,
                order: formValue.order,
                activities: []
            }
            this.travelsService.addStep(travelId, newStep).subscribe({
                next: (res) => {
                    this.loadTravel();
                }
            });
        }
    }
}