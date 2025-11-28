import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TravelsService } from "../../services/travels/travels.service";
import { Travel, TravelsResponse } from "../../models/travel.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { loadTravels } from "../../store/actions/travel.actions";
import { selectTravels } from "../../store/selectors/travels.selectors";

@Component({
    selector: 'app-home',
    imports: [ReactiveFormsModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private readonly travelsService = inject(TravelsService);
    private store = inject(Store<AppState>);
    private fb = inject(FormBuilder);
    
    protected travels = signal<Travel[]>([]);
    protected readonly travelsStore = signal<Travel[]>([]);

    public travelForm: FormGroup;

    constructor() {
        /* this.store.select(selectTravels).subscribe(travels => {
            this.travelsStore.set(travels);
        }); */

        this.travelForm = this.fb.group({
            title: ['', [Validators.required]],
            destination: ['', [Validators.required]],
            description: [''],
            startDate: [''],
            endDate: [''],
        });
    }

    ngOnInit(): void {
        this.loadTravels();
        const travels = this.travels();
        this.store.dispatch(loadTravels({ travels }));

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

    addTravel() {
        if (this.travelForm.valid) {
            
            const formValue = this.travelForm.value;
            const newTravel: Travel = {
                title: formValue.title,
                destination: formValue.destination,
                description: formValue.description,
                startDate: formValue.startDate,
                endDate: formValue.endDate,
                steps: []
            };
            this.travelsService.createTravel(newTravel).subscribe({
                next: () => {
                    this.loadTravels();
                },
                error: (err) => {
                    console.log(err);
                }
            });

            this.travelForm.reset({
                title: '',
                destination: '',
                description: '',
                startDate: '',
                endDate: '',
            })
        }
    }

    deleteTravel(id: number){
        this.travelsService.deleteTravel(id).subscribe({
            next: () => {
                this.loadTravels(); 
            }
        });
    }
}