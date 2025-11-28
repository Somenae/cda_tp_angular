import { Component, computed, input } from "@angular/core";
import { Step } from "../../models/step.model";
import { ActivityComponent } from "../activities/activities.component";

@Component({
    selector: 'app-steps',
    imports: [ActivityComponent],
    templateUrl: './steps.component.html'
})
export class StepsComponent {
    step = input.required<Step>();
    protected readonly activities = computed(() => {
        return this.step()?.activities || [];
    })

    constructor() {
    }
}