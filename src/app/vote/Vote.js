import React, { Component } from 'react';
import constants from 'helper/constants';

class Vote extends Component {
  constructor(props) {
    super(props);

    // Properties
    this.question = this.props.question;
    this.choices = this.props.choices;
    this.callback = this.props.callback;

    // Bindings
    this.handleExit = this.handleExit.bind(this); 
    this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
  }

  handleVoteSubmit(e) {
    this.callback(constants.action.submitVote, e.target.id);
  }

  handleExit() {
    this.callback(constants.action.exit);
  }

  render() {
    // Prepare choices list
    const choicesList = this.choices.map(choice =>
      <div key={choice.url}>
        {choice.choice}{choice.votes}{'?? %'}
        <button
          id={choice.url.split('/').pop()}
          onClick={this.handleVoteSubmit}>Submit Vote
        </button>
      </div>) || '-';

    return (
      <div>
        <button onClick={this.handleExit}>Exit</button>
        <h1>{this.question || '-'}</h1>
        {choicesList}
      </div>
    );
  }
}

export default Vote;
