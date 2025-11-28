import { createAction, props } from "@ngrx/store";
import { Activity } from "../../models/activity.model";
import { Travel } from "../../models/travel.model";

export const loadTravels = createAction(
    '[Travel] Load Travels',
    props<{ travels: Travel[] }>()
);

export const addActivity = createAction(
    '[Travel] Add Travel',
    props<{ travelId: number; stepId: number; activity: Omit<Activity, 'id'> }>()
);