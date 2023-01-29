import styled from 'styled-components';

export const ContainerPage = styled.div`
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-rows: 50px calc(100% - 2 * 50px) 50px;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const ContainerQuestion = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 32px;
    font-weight: 500;
  }
`;