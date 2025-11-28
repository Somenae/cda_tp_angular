import { Travel } from "../../models/travel.model";

export interface TravelsState {
    travels: Travel[];
};

export const initialState: TravelsState = {
    travels: [],
};