import React from "react"
import ReactDOM from "react-dom"

import Root from "./components/Root"
import store from "./store"


const app = document.getElementById('app')

ReactDOM.render(<Root store={store}/> , app);
