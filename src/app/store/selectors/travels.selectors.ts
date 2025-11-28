import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TravelsState } from "../state/travels.state";

export const selectTravelState = createFeatureSelector<TravelsState>('travel');

export const selectTravels = createSelector(
    selectTravelState,
    (state: TravelsState) => state.travels
);

export const selectTravelById = (id: number) => createSelector(
    selectTravels,
    (travels) => travels.find(travel => travel.id === id)
);
