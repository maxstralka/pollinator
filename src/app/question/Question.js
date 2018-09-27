import React, { Component } from 'react';

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
      <div>
        <h1>{this.question || '-'}</h1>
        <h2>{dayAndMonth || '-'}</h2>
        <h2>Choices: {this.choices.length || '-'}</h2>
        <button onClick={this.handleCallback}>Vote</button>
      </div>
    );
  }
}

export default Question;
