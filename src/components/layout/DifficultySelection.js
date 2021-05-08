import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import LoadQuiz from './LoadQuiz';

const DifficultySelection = () => {
  const level = ['Easy', 'Medium', 'Hard'];
  const [isSubmit, setSubmit] = useState(false);
  const [disabledRadio, setDisable] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [reStart, setRestart] = useState(false);

  const handleChange = (e) => {
    setDifficultyLevel(e.target.value);
  }

  const handleClick = (e) => {
    if (difficultyLevel !== '') {
      setDisable(true);
      setSubmit(true);
    }
  }

  useEffect(() => {
    setRestart(false)
    setDisable(false);
    setSubmit(false);
    setDifficultyLevel('');
  }, [reStart]);

  return (
    <div className='container bg-primary'>
      <div className='level-selection'>
        <Form>
          <h2>Select Difficulty:</h2>
          {
            level.map((level) => {
              const value = level.toLocaleLowerCase();
              return <Form.Group>
                <Form.Radio
                  label={level}
                  value={value}
                  checked={difficultyLevel === value}
                  disabled={(disabledRadio || reStart) && difficultyLevel !== value}
                  onChange={handleChange}
                />
              </Form.Group>
            })
          }
          <Button className='btn' type='submit' onClick={handleClick}
            disabled={difficultyLevel === '' || difficultyLevel === undefined}>Submit</Button>
        </Form>
      </div>
      {isSubmit && <div>
        <LoadQuiz difficultyLevel={difficultyLevel} setRestart={setRestart} />
      </div>
      }
    </div>
  );
}

export default DifficultySelection;
