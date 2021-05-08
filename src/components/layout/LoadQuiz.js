import React from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import QuestionData from './QuestionData';

class LoadQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      questionList: [],
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { difficultyLevel } = this.props;
    const res = await axios.get(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficultyLevel}`);
    this.setState({ loading: false, questionList: res.data.results });
  }

  render() {
    const { questionList, loading } = this.state;
    return (
      <div className=''>
        {
          loading ? <Spinner /> : 
          <div className='wrap-content'>
            <QuestionData questionList={questionList} setRestart={this.props.setRestart}/>
          </div>
        }
      </div>
    );
  }
}

export default LoadQuiz;
