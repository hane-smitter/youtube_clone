import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initState = {
    name: "Summit",
    age: 21,
}

const reducer = initState => initState;

const store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(thunk)))

export default store;