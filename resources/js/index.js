import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import store from './store'
import { Provider } from 'react-redux';

if(document.getElementById('root')){

  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <Main />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
  );
  
}

