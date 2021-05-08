import { useEffect, useState } from 'react';
import RenderQuiz from './RenderQuiz';
import { Button } from 'semantic-ui-react';

const QuestionData = ({ questionList, setRestart }) => {
  const [queNumber, setQueNumber] = useState(0);
  const [marks, setMarks] = useState(0);

  const countMarks = (input) => {
    setMarks(marks + input);
  }

  const handleClick = (e) => {
    setRestart(true);
  }

  useEffect(() => {
    let timeout;
    if (queNumber < questionList.length) {
      timeout = setTimeout(() => {
        setQueNumber(queNumber + 1);
      }, 10000);
    }
    return () => clearTimeout(timeout);
  }, [queNumber]);


  return (
    <div className='wrap-content'>
      { questionList[queNumber] && <RenderQuiz questionObj={questionList[queNumber]} countMarks={countMarks} />}
      { queNumber === questionList.length && <div className='score-cart'>
          <h3>Your score is {marks}</h3>
          <Button className='btn' onClick={handleClick}>Restart</Button>
        </div>
      }
    </div>
  );
}

export default QuestionData;
