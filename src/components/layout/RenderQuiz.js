import { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

const RenderQuiz = ({ questionObj, countMarks }) => {
  const { question, correct_answer, incorrect_answers } = questionObj;
  const option = [...incorrect_answers, correct_answer].sort(() => Math.random() - 1);
  const [selected, setSelected] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(true);
      setSelected(value);
      countMarks(correct_answer === value ? 1 : 0);
    }
  }

  useEffect(() => {
    setDisabled(false);
    setSelected('')
  }, [questionObj]);

  return (
    <div className='wrap-question'>
      <div className='question'>
        <h3>{question}</h3>
      </div>
      {
        option.map((option, index) => {
          return (
            <div className='question-list' key={index}>
              <Form>
                <Form.Group inline>
                  <Form.Radio
                    label={option}
                    value={option}
                    checked={selected === option}
                    disabled={disabled && selected !== option}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </div>
          )
        })
      }
      {
        selected && <div className='answer'>
          <h3>Your answer is {correct_answer === selected ? 'Correct' : 'InCorrect'}</h3>
          {correct_answer !== selected && <h3>Correct answer is: {correct_answer}</h3>}
        </div>
      }
    </div>
  )
}

export default RenderQuiz;
