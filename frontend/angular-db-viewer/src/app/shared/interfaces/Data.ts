export interface Tournament {
  id_tournament: number;
  location: string;
  count_stages: number;
  name: string;
}

export interface Race {
  id_race: number;
  id_tournament: number;
  stage_of_tournament: number;
  max_rank: number;
}

export interface DataResponse {
  tournaments: Tournament[];
  tournamentCount: number;
  races: Race[];
  raceCount: number;
}

export interface Pagination {
  offset: number;
  limit: number;
}
