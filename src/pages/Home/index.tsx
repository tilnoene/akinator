import { useState } from 'react';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { ContainerButtons, ContainerPage, ContainerQuestion } from './styles';

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      question: 'O personagem é homem?',
    },
    {
      id: 2,
      question: 'O personagem é azul?',
    },
    {
      id: 3,
      question: 'O personagem canta?',
    }
  ];

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  }

  const setAnswer = (id: number, answer: Answer) => {
    console.log(id, answer);

    nextQuestion();
  }

  return (
    <ContainerPage>
      <div></div>

      {currentQuestion < questions.length ?
        (
          <ContainerQuestion>
            <h1>
              {questions[currentQuestion].question}
            </h1>

            <ContainerButtons>
              <Button onClick={() =>
                setAnswer(questions[currentQuestion].id, 'YES')
              }>
                SIM
              </Button>

              <Button onClick={() =>
                setAnswer(questions[currentQuestion].id, 'YES')
              }>
                NÃO
              </Button>

              <Button onClick={() =>
                setAnswer(questions[currentQuestion].id, 'YES')
              }>
                NÃO SEI
              </Button>
            </ContainerButtons>
          </ContainerQuestion>
        ) : (
          <div>
            Não consegui adivinhar quem é :(
          </div>
        )
      }

      <Footer />

    </ContainerPage >
  );
};

export default Home;
