import request from 'superagent';
import constants from 'helper/constants';

/**
 * Api requests are required to return an object containing
 * three properties: status, body, error - use response()
 * to create this object
 */

class Api {
  static response(err, res, callback) {
    let status; 

    if (res && res.statusCode === 200) {
      status = constants.api.status.success;
    } else {
      status = constants.api.status.failure;
    }

    callback({
      status,
      res,
      err,
    });
  }

  constructor(baseUrl) {
    // Properties
    this.baseUrl = baseUrl;
  }

  /**
   * Get collection of questions based on page (GET)
   * @param {number} page - The page of questions to return Example
   */
  getQuestionsCollection(page, callback) {
    request
      .get(`${this.baseUrl}/questions`)
      .set('Content-Type', 'application/json')
      .type('json')
      .query({
        [constants.api.parameters.page]: page,
      })
      .end((err, res) => {
        Api.response(err, res, callback);
    });
  }

  /**
   * Get details of one specific question (GET)
   * @param {number} questionId - Id of question
   */
  getQuestion(questionId, callback) {
    request
      .get(`${this.baseUrl}/questions/${questionId}`)
      .set('Content-Type', 'application/json')
      .type('json')
      .end((err, res) => {
        Api.response(err, res, callback);
    });
  }

  /**
   * Vote on a choice (POST)
   * @param {number} questionId - Id of question
   * @param {number} choiceId - Id of choice
   */
  postChoice(questionId, choiceId, callback) {
    request
      .post(`${this.baseUrl}/questions/${questionId}/choices/${choiceId}`)
      .set('Content-Type', 'application/json')
      .type('json')
      .send({
        [constants.api.parameters.questionId]: questionId,
        [constants.api.parameters.choiceId]: choiceId,
      })
      .end((err, res) => {
        Api.response(err, res, callback);
    });
  }

  /**
   * Create new question (POST)
   * @param {string} question - The question
   * @param {Array.<string>} choices - A collection of choices
   */
  postQuestion(question, choices, callback) {
    request
      .post(`${this.baseUrl}/questions`)
      .set('Content-Type', 'application/json')
      .type('json')
      .send({
        [constants.api.parameters.question]: question,
        [constants.api.parameters.choices]: choices,
      })
      .end((err, res) => {
        Api.response(err, res, callback);
    });
  }

}

export default Api;
