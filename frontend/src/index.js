import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore, applyMiddleware ,compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Redux from './Redux/main';
import action from './Redux/actions/index';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
const history = createBrowserHistory();

//TODO: Study- 1.how many dispatch can be in mapDispatchProps 
//FIXME: why the init store loads 3 time ?

const store = createStore(
    Redux.reducer(history),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(routerMiddleware(history),thunk)),
    );

store.dispatch(action.fetchAllPolls());


ReactDOM.render(
    <Router> 
        <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
        </Provider>
    </Router>
    
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
