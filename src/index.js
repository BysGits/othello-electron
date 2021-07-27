import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Othello from './Othello/Othello';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Othello />, document.getElementById('root'));
registerServiceWorker();
