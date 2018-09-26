const api = {
  url: {
    production: 'https://polls.apiblueprint.org',
    debuggingProxy: 'https://private-anon-077030b81e-pollsapi.apiary-proxy.com',
    mock: 'https://private-d94042-pollsapi.apiary-mock.com',
  },
  status: {
    success: 'success',
    failure: 'failure',
  },
  parameters: {
    choiceId: 'choice_id',
    questionId: 'question_id',
    question: 'question',
    choices: 'choices',
  }
};

module.exports = {
  api,
};
