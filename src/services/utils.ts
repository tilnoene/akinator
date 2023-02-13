import { ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const parseString = (str: string): string => {
  return str.replace('_', ' ');
};

export const askQuestion = (question: Question) => {
  if (question.column === 'type') {
    return `Is it a: ${question.data}?`;
  } else if (question.column === 'director') {
    return `Is ${question.data} the director, or one of the directors?`;
  } else if (question.column === 'cast') {
    return `This person was part of the show: ${question.data}`;
  } else if (question.column === 'country') {
    return `It was produced in this country: ${question.data}`;
  } else if (question.column === 'release_year') {
    return `The year it was released is greater than: ${question.data}`;
  } else if (question.column === 'rating') {
    return `The rating is above: ${question.data}`;
  } else if (question.column === 'listed_in') {
    return `${question.data} theme can describe it`;
  } else if (question.column === 'duration') {
    var type_str = 'Minute(s) / Season(s)';

    return `It's duration is more than ${question.data} ${type_str}?`;
  }

  return "Error";
};
