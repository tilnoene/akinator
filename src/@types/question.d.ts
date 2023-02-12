type Answer = 'yes' | 'no' | 'idk'; // I don't know

type Question = {
  column: string;
  data: string;
  answer?: Answer;
}

type Guess = string | null;

type GameState = {
  questions: Question[];
  guesses: Guess[];
}
