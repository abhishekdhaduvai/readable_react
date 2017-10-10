import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const logger = store => next => action => {
//   console.group(action.type)
//   console.info('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   console.groupEnd(action.type)
//   return result
// }

const store = createStore(
  reducer,
  composeEnhancers(
	  applyMiddleware(thunk)
  )
)

ReactDOM.render(	
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>			
          <App />			
      </MuiThemeProvider>
      </BrowserRouter>
    </Provider>,	
	document.getElementById('root')
);
registerServiceWorker();
