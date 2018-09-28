import request from 'superagent';
import constants from 'helper/constants';

/**
 * Api documentation (https://pollsapi.docs.apiary.io)
 * recommends to follow 'url' values to get to resources
 * instead of constructing URLs based on choice and question ids,
 * to keep the client decoupled from implementation details
 */

/**
 * All api requests in class Api are required to return
 * an object containing three properties: status, body,
 * error - use response() to create this object
 */
class Api {
  static response(err, res, callback) {
    let status; 

    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
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
   * @param {string} url - Url to question resource
   */
  getQuestion(url, callback) {
    request
      .get(`${this.baseUrl}${url}`)
      .set('Content-Type', 'application/json')
      .type('json')
      .end((err, res) => {
        Api.response(err, res, callback);
    });
  }

  /**
   * Vote on a choice (POST)
   * @param {string} url - Url to choice resource
   */
  postChoice(url, callback) {
    request
      .post(`${this.baseUrl}${url}`)
      .set('Content-Type', 'application/json')
      .type('json')
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
