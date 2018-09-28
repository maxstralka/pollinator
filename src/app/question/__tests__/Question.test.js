import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Question from 'app/question/Question';

// Mock properties
const questionMock = 'Is this a question?';
const choicesMock = [
  {
    choice: 'choice 1',
  },
  {
    choice: 'choice 2',
  },
];
const urlMock = '/question/1';
const publishedAtMock = '2018-09-28T01:11:34.134637+00:00';
const callbackMock = jest.fn(); 

// Shallow render component
const wrapper = shallow(
  <Question
    question={questionMock}
    choices={choicesMock}
    url={urlMock}
    publishedAt={publishedAtMock}
    callback={callbackMock}
  />
);

// Tests
it('displays question correctly', () => {
  expect(wrapper.find('h2').text()).toEqual(questionMock);
});

it('counts number of questions correctly', () => {
  expect(wrapper.find('p').text()).toMatch(/Choices: 2/);
});

it('parses the timestamp correctly', () => {
  expect(wrapper.find('p').text()).toMatch(/28\/8/);
});

it('calls callback on button click', () => {
  wrapper.find('button').props().onClick();
  expect(callbackMock).toHaveBeenCalledTimes(1);
});
