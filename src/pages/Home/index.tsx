import { useState, useEffect } from 'react';

import Button from '../../components/Button';
import Footer from '../../components/Footer';
import PuffLoader from 'react-spinners/PuffLoader';

import { ContainerButtons, ContainerPage, ContainerQuestion } from './styles';

import api from '../../services/api';

import { toast } from 'react-toastify';
import { askQuestion, toastOptions } from '../../services/utils';

const defaultGameState: GameState = {
  questions: [],
  guesses: [],
};

const Home = () => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [country, setCountry] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('');
  const [listedIn, setListedIn] = useState('');

  const getNewGameState = (oldGameState: GameState) => {
    setLoading(true);

    api
      .post('/', oldGameState)
      .then(response => {
        setGameState(response.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Ocorreu um erro!', toastOptions);
      });
  };

  const setQuestionAnswer = (answer: Answer) => {
    const aux = gameState;
    aux.questions[aux.questions.length - 1].answer = answer;

    setGameState(aux);
    getNewGameState(aux);
  };

  const startNewGame = () => {
    getNewGameState(defaultGameState);
    setAnswer(null);
  };

  const addNewLine = () => {
    api
      .post('/add_line', {
        type: type,
        director: director,
        cast: cast,
        country: country,
        release_year: releaseYear,
        duration: duration,
        rating: rating,
        listed_in: listedIn,
        title: title,
      })
      .then(() => {
        toast.success('Dado adicionado com sucesso!', toastOptions);
      })
      .catch(err => {
        toast.error('Ocorreu um erro!', toastOptions);
      });
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <ContainerPage>
      <div>
        <h2 style={{ maxWidth: '520px', margin: 0, paddingTop: '20px' }}>Akinator</h2>
        <h3 style={{ maxWidth: '520px', margin: 0, fontWeight: 300 }}>Possíveis respostas: {gameState.remain ? gameState.remain : "?"}</h3>
      </div>

      {loading ? (
        <PuffLoader
          color="#FFFFFF"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={{
            display: 'block',
            margin: '0 auto',
            borderColor: 'red',
          }}
        />
      ) : (
        <div>
          {answer ? (
            <div>
              <h2>Adivinhei! A resposta é:</h2>
              <h1>{answer}!</h1>

              <br />

              <Button onClick={() => startNewGame()}>JOGAR NOVAMENTE</Button>
            </div>
          ) : (
            <div>
              {gameState.guesses.length === 0 ? (
                <ContainerQuestion>
                  <h1>
                    {askQuestion(
                      gameState.questions[gameState.questions.length - 1],
                    )}
                  </h1>

                  <ContainerButtons>
                    <Button onClick={() => setQuestionAnswer('yes')}>
                      YES
                    </Button>
                    <Button onClick={() => setQuestionAnswer('no')}>NO</Button>
                    <Button onClick={() => setQuestionAnswer('idk')}>
                      DON'T KNOW
                    </Button>
                  </ContainerButtons>
                </ContainerQuestion>
              ) : (
                <div>
                  {gameState.guesses[gameState.guesses.length - 1] ? (
                    <div>
                      <h1>
                        Is{' '}
                        <b>{gameState.guesses[gameState.guesses.length - 1]}</b>
                        ?
                      </h1>

                      <ContainerButtons>
                        <Button
                          onClick={() =>
                            setAnswer(
                              gameState.guesses[gameState.guesses.length - 1],
                            )
                          }
                        >
                          SIM
                        </Button>
                        <Button onClick={() => getNewGameState(gameState)}>
                          NÃO
                        </Button>
                      </ContainerButtons>
                    </div>
                  ) : (
                    <div>
                      <h2>Não consegui adivinhar quem é! :(</h2>
                      <h2>Adicione o dado que você pensou:</h2>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          margin: '18px 0',
                        }}
                      >
                        <input
                          placeholder="Title"
                          value={title}
                          onChange={(e: any) => setTitle(e.target.value)}
                        />
                        <input
                          placeholder="Tipo"
                          value={type}
                          onChange={(e: any) => setType(e.target.value)}
                        />
                        <input
                          placeholder="Diretor(es)"
                          value={director}
                          onChange={(e: any) => setDirector(e.target.value)}
                        />
                        <input
                          placeholder="Ator(es)"
                          value={cast}
                          onChange={(e: any) => setCast(e.target.value)}
                        />
                        <input
                          placeholder="País"
                          value={country}
                          onChange={(e: any) => setCountry(e.target.value)}
                        />
                        <input
                          placeholder="Ano de Lançamento"
                          value={releaseYear}
                          onChange={(e: any) => setReleaseYear(e.target.value)}
                        />
                        <input
                          placeholder="Duração"
                          value={duration}
                          onChange={(e: any) => setDuration(e.target.value)}
                        />
                        <input
                          placeholder="Faixa Etária"
                          value={rating}
                          onChange={(e: any) => setRating(e.target.value)}
                        />
                        <input
                          placeholder="Temas"
                          value={listedIn}
                          onChange={(e: any) => setListedIn(e.target.value)}
                        />

                        <Button
                          onClick={() => {
                            addNewLine();
                            startNewGame();
                          }}
                        >
                          ADICIONAR PERSONAGEM
                        </Button>
                        <Button onClick={() => startNewGame()}>
                          JOGAR NOVAMENTE
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Footer />
    </ContainerPage>
  );
};

export default Home;
