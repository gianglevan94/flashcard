import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as reducers from './reducers';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import * as localStore from './localStore';
reducers.routing = routerReducer;

import App from './components/App';
import VisibleDeck from './components/VisibleDeck';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';

const store = Redux.createStore(Redux.combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(browserHistory, store);
function run() {
    let state = store.getState();
    localStore.set(state, ['decks', 'cards']);
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="/deck/:deckId" component={VisibleDeck}>
                        <Route path="/deck/:deckId/new" component={NewCardModal}/>
                        <Route path="/deck/:deckId/edit/:cardId" component={EditCardModal}/>
                    </Route>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
}
run();
store.subscribe(run);