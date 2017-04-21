import React from "react";
import { Router, Route, hashHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore }  from "react-router-redux";

import Layout from "./Layout";
import CityWeather from "./CityWeather"

import store from "../store"

const history = syncHistoryWithStore(hashHistory, store)

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={history}>            
            <Route path="/" component={Layout}/>
            <Route path="/city/:id" component={CityWeather} />                       
        </Router>
    </Provider>
)


export default Root;