import React, { Component } from 'react';
import 'app/question/Question.css';

class Question extends Component {
  constructor(props) {
    super(props);

    // Properties
    this.question = this.props.question;
    this.choices = this.props.choices;
    this.url = this.props.url;
    this.publishedAt = this.props.publishedAt;
    this.callback = this.props.callback;

    // Bindings
    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback() {
    // Id of question is not directly available in the
    // model provided and needs to be extracted from the url
    const id = this.url.split('/').pop(); 
    this.callback(id);
  }

  render() {
    // Parse publishedAt timestamp
    const date = new Date(this.publishedAt);
    const month = date.getMonth();
    const day = date.getDate();
    const dayAndMonth = `${day}/${month}`;

    return (
      <div className="col-md-6 col-lg-4">
        <div className="question text-center">
          <h2>{this.question || '-'}</h2>
          <p>Choices: {this.choices.length || '-'} |
             Date: {dayAndMonth || '-'}
          </p>
          <div className="text-center">
            <button
              className="btn btn-outline-secondary"
              onClick={this.handleCallback}>Vote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
