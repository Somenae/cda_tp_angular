import { createReducer, on } from '@ngrx/store';
import * as TravelActions from '../actions/travel.actions';
import { initialState, TravelsState } from '../state/travels.state';

export const travelReducer = createReducer(
    initialState,

    on(TravelActions.loadTravels, (state, { travels }): TravelsState => ({
        ...state,
        travels: [...travels],
    })),

    on(TravelActions.addActivity, (state, { travelId, stepId, activity }): TravelsState => {
        const allActivities = state.travels.flatMap(travel => 
            travel.steps.flatMap(step => step.activities)
        );
        const maxId = allActivities.length > 0 ? Math.max(...allActivities.map(activity => activity.id)) : 0;
        const newActivity = {
            ...activity,
            id: maxId +1
        };

        const travels = state.travels.map(travel => {
            if (travel.id === travelId) {
                const steps = travel.steps.map(step => {
                    if (step.id === stepId) {
                        return {
                            ...step,
                            activities: [...step.activities, newActivity]
                        };
                    }
                    return step;
                });
                return {
                    ...travel,
                    steps
                };
            }
            return travel;
        });

        return {
            ...state,
            travels,
        }
    })
);