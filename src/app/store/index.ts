import { ActionReducerMap } from "@ngrx/store";
import { TravelsState } from "./state/travels.state";
import { travelReducer } from "./reducers/travels.reducers";

export interface AppState {
    travel: TravelsState;
};

export const reducers: ActionReducerMap<AppState> = {
    travel: travelReducer
};