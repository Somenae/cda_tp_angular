import { Step } from "./step.model";

export interface TravelsResponse {
    [key: number]: Travel,
}

export interface Travel {
    id?: number,
    title: string,
    destination: string,
    description?: string,
    startDate?: string,
    endDate?: string,
    imageUrl?: string, // URL de l'image (optionnel, accessible via /public/filename)
    steps: Step[]
}