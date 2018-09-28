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
    this.handleVoteAction = this.handleVoteAction.bind(this);
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

  // Fetch questions collection
  fetchQuestions(callback) {
    this.api.getQuestionsCollection(constants.initialQuestionsPage, (api) => {
      callback(api.status, api.res.body);
    });
  }

  // Submit selected vote
  submitVote(voteUrl, callback) {
    this.api.postChoice(voteUrl, (api) => {
      callback(api.status);
    });
  }

  // Handle action (exit / vote) by user on vote view
  handleVoteAction(action, voteUrl) {
    if (action === constants.action.exit) {
      this.setState({
        vote: {
          visible: false,
          id: null,
        },
      });
    }

    if (action === constants.action.submitVote) {
      this.setState({
        apiStatus: constants.api.status.loading,
      });

      // First submit vote, second fetch
      // updated questions, third update state
      this.submitVote(voteUrl, (apiStatus) => {
        if (apiStatus === constants.api.status.success) {
          this.fetchQuestions((apiStatus, questions) => {
            if (apiStatus === constants.api.status.success) {
              this.setState({
                apiStatus: constants.api.status.success,
                questions,
                vote: {
                  visible: false,
                },
              });
            } else {
              this.setState({
                apiStatus: constants.api.status.failure,
              });
            }
          });
        } else {
          this.setState({
            apiStatus: constants.api.status.failure,
          });
        }
      });
    }
  }

  componentDidMount() {
    // Set api state to loading
    this.setState({
      apiStatus: constants.api.status.loading,
    });

    this.fetchQuestions((apiStatus, questions) => {
      // Update state with results
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
      <div className="status-indicator">
        <h3>{'Loading...'}</h3>
      </div> : null;

    const apiFailureIndicator =
      (apiStatus === constants.api.status.failure) ?
      <div className="status-indicator">
        <h3>{'Sorry. An error occured.'}</h3>
      </div> : null;

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
        callback={this.handleVoteAction}
      /> : null;

    // Header
    const header = !vote.visible ? <div className="header">
      <h1>The Pollinator</h1>
      <p>It's voting time</p>
    </div> : null;

    return (
      <div className="container">
        {header}
        {apiFailureIndicator}
        {voteComponent}
        <div className="row">
          {questionsList}
        </div>
        {loadingIndicator}
      </div>
    );
  }
}

export default App;
