import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Vote from 'app/vote/Vote';
import constants from 'helper/constants';

// Mock properties
const questionMock = 'Is this a question?';
const choicesMock = [
  {
    choice: "Objective-C",
    url: "/questions/10499/choices/38672",
    votes: 18,
  },
  {
    choice: "Objective-C",
    url: "/questions/10499/choices/38672",
    votes: 18,
  },
];
const callbackMock = jest.fn(); 

// Shallow render component
const wrapper = shallow(
  <Vote
    question={questionMock}
    choices={choicesMock}
    callback={callbackMock}
  />
);

// Tests
it('calls callback with correct action on exit click', () => {
  wrapper.find('#exit').props().onClick();
  expect(callbackMock.mock.calls[0]).toContain(constants.action.exit);
});

it('displays question correctly', () => {
  expect(wrapper.find('h1').text()).toEqual(questionMock);
});

it('displays all choices', () => {
  expect(wrapper.find('#vote').children()).toHaveLength(choicesMock.length);
});
