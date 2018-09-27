import React, { Component } from 'react';
import constants from 'helper/constants';
import Question from 'app/question/Question';
import Vote from 'app/vote/Vote';
import 'app/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Properties
    this.api = this.props.api;

    // State
    this.state = {
      apiStatus: null,
      questions: null,
      vote: {
        visible: false,
        id: null,
      },
    }

    // Bindings
    this.showVote = this.showVote.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  showVote(id) {
    // Update state to show vote
    this.setState({
      vote: {
        visible: true,
        id,
      },
    });
  }

  handleVote(action, selectedChoice) {
    // Hide and reset vote component, if exit was pressed
    if (action === constants.action.exit) {
      this.setState({
        vote: {
          visible: false,
          id: null,
        },
      });
    }

    // Submit vote to api
    if (action === constants.action.submitVote) {
    }
  }

  componentDidMount() {
    // Set api state to loading
    this.setState({
      apiStatus: constants.api.status.loading,
    });

    // Fetch questions collection
    this.api.getQuestionsCollection(constants.initialQuestionsPage, (api) => {
      let questions;
      let apiStatus;

      // Handle api success / failure cases
      if (api.status === constants.api.status.success) {
        // Set api status to success and assign questions data
        questions = api.res.body;
        apiStatus = constants.api.status.success;
      } else {
        // Set api status to failure
        apiStatus = constants.api.status.failure;
      }

      // Update state
      this.setState({
        questions,
        apiStatus,
      });
    });
  }

  render() {
    const { apiStatus, questions, vote } = this.state;

    // Prepare loading / failure indicators
    const loadingIndicator =
      (!apiStatus || apiStatus === constants.api.status.loading) ?
      <h1>{'Loading...'}</h1> : null;
    const apiFailureIndicator =
      (apiStatus === constants.api.status.failure) ?
      <h1>{'Sorry. An error occured.'}</h1> : null;

    // Prepare list of question components
    const questionsList = questions && !vote.visible ?
      questions.map(item =>
      <Question
        question={item.question}
        choices={item.choices}
        publishedAt = {item[constants.api.parameters.publishedAt]}
        callback = {this.showVote}
        url = {item.url}
        key={item.url}
      />
    ) : null;

    // Select and prepare vote component
    const voteContent = (questions && vote.id) ?
      questions.find(question =>
        question.url.includes(vote.id)) : null;
    const voteComponent = vote.visible ?
      <Vote
        question={voteContent.question}
        choices={voteContent.choices}
        callback={this.handleVote}
      /> : null;

    return (
      <div className="App">
        {loadingIndicator}
        {apiFailureIndicator}
        {voteComponent}
        {questionsList}
      </div>
    );
  }
}

export default App;
