import { Planet } from "./planet.model";

export class Movie {
    title: string;

    episode_id: number;

    director: string;

    producer: string;

    release_date: Date;

    planets: Planet[];
}