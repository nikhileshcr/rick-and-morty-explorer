export interface Character {
  id: string;
  name: string;
  image: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  origin: origin;
  location: location;
  episode: episode[];
}

export interface DisplayCharacter {
  name: string;
  status: string;
  gender: string;
  location: string;
  species: string;
  totalEpisode: number;
}
type origin = {
  name: string;
};

type location = {
  name: string;
};

type episode = {
  episode: string;
};
