import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import Form from "./Form";


const rootEl = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <div className='container'>
            <Form onSubmit={showResults} />
        </div>
    </Provider>,
    rootEl
);
