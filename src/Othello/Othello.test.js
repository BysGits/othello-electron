import React from 'react';
import ReactDOM from 'react-dom';
import Othello from './Othello';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Othello />, div);
  ReactDOM.unmountComponentAtNode(div);
});
