import { Component, input } from "@angular/core";
import { Activity } from "../../models/activity.model";

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.css']
})
export class ActivityComponent {
    activity = input.required<Activity>();

    constructor() {
    }
}