import { useState, useEffect } from 'react';

import Button from '../../components/Button';
import Footer from '../../components/Footer';
import PuffLoader from "react-spinners/PuffLoader";

import { ContainerButtons, ContainerPage, ContainerQuestion } from './styles';

import api from '../../services/api';

import { toast } from 'react-toastify';
import { parseString, toastOptions } from '../../services/utils';

const defaultGameState: GameState = {
  questions: [],
  guesses: [],
};

const Home = () => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState<string | null>(null);

  const getNewGameState = (oldGameState: GameState) => {
    setLoading(true);

    api
      .post('/', oldGameState)
      .then(response => {
        setGameState(response.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Ocorreu um erro!', toastOptions)
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
  }

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <ContainerPage>
      <div><h2 style={{ maxWidth: '520px' }}>Akinator</h2></div>

      {loading ? (
        <PuffLoader
          color="#FFFFFF"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={{
            display: "block",
            margin: "0 auto",
            borderColor: "red",
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
          ) :
            <div>
              {gameState.guesses.length === 0 ? (
                <ContainerQuestion>
                  <h1>
                    Is the{' '}
                    {parseString(gameState.questions[gameState.questions.length - 1].column)}{' '}
                    {parseString(gameState.questions[gameState.questions.length - 1].data)}?
                  </h1>

                  <ContainerButtons>
                    <Button onClick={() => setQuestionAnswer('yes')}>SIM</Button>
                    <Button onClick={() => setQuestionAnswer('no')}>NÃO</Button>
                    <Button onClick={() => setQuestionAnswer('idk')}>NÃO SEI</Button>
                  </ContainerButtons>
                </ContainerQuestion>
              ) : (
                <div>
                  {gameState.guesses[gameState.guesses.length - 1] ? (
                    <div>
                      <h1>Is {gameState.guesses[gameState.guesses.length - 1]}?</h1>

                      <ContainerButtons>
                        <Button onClick={() => setAnswer(gameState.guesses[gameState.guesses.length - 1])}>SIM</Button>
                        <Button onClick={() => getNewGameState(gameState)}>NÃO</Button>
                      </ContainerButtons>
                    </div>
                  ) : (
                    <div>
                      <h2>Não consegui adivinhar quem é! :(</h2>
                      <Button onClick={() => startNewGame()}>JOGAR NOVAMENTE</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        </div>
      )}

      <Footer />
    </ContainerPage>
  );
};

export default Home;
