import React, { Component } from 'react';
import constants from 'helper/constants';
import 'app/vote/Vote.css';

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
    this.callback(constants.action.submitVote, e.target.value);
  }

  handleExit() {
    this.callback(constants.action.exit);
  }

  render() {
    // Prepare choices list
    const totalVotes = this.choices.reduce((acc, current) => acc + current.votes, 0);

    const choicesList = this.choices.map(choice =>
      <div className="list-group-item list-group-item-action" key={choice.url}>
        <span className="choice">{choice.choice}</span>
        <span className="details"> (Total: {choice.votes} |
          Share: {totalVotes ? ((choice.votes/totalVotes)*100).toFixed(0) : 0}%)</span>
        <button
          className="btn btn-warning float-right"
          id="vote"
          value={choice.url}
          onClick={this.handleVoteSubmit}>Submit Vote
        </button>
      </div>) || '-';

    return (
      <div className="vote">
        <button
          id="exit"
          className="btn btn-outline-secondary"
          onClick={this.handleExit}>Exit
        </button>
        <h1>{this.question || '-'}</h1>
        <div id="choices" className="list-group">
          {choicesList}
        </div>
      </div>
    );
  }
}

export default Vote;
