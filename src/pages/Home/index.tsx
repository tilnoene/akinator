import { useState, useEffect } from 'react';

import Button from '../../components/Button';
import Footer from '../../components/Footer';

import { ContainerButtons, ContainerPage, ContainerQuestion } from './styles';

import api from '../../services/api';

import { toast } from 'react-toastify';
import { toastOptions } from '../../services/utils';

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
        console.log(response.data);

        setGameState(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err); // TODO: pop up
        toast.error('Ocorreu um erro!', toastOptions)
      });
  };

  const setQuestionAnswer = (answer: Answer) => {
    const aux = gameState;
    aux.questions[aux.questions.length - 1].answer = answer;

    setGameState(aux);
    getNewGameState(aux);
  };

  useEffect(() => {
    getNewGameState(defaultGameState);
  }, []);

  return (
    <ContainerPage>
      <div>Memoização</div>

      {loading ? (
        <div>TODO: loading...</div>
      ) : (
        <div>

        
        <div>
          {gameState.guesses.length === 0 ? (
            <ContainerQuestion>
              <h1>
                Is the{' '}
                {gameState.questions[gameState.questions.length - 1].column}{' '}
                {gameState.questions[gameState.questions.length - 1].data}?
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
                <div>Não consegui adivinhar quem é! :(</div>
              )}
            </div>
          )}
          </div>
        </div>
      )}

      <Footer />
    </ContainerPage>
  );
};

export default Home;
