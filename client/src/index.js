import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserStore from "./store/UserStore";
import ProfileStore from "./store/ProfileStore";
import PendingQuestionStore from "./store/PendingQuestionStore";
import './index.css'

export const Context = createContext(null)



ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        profile: new ProfileStore(),
        pending: new PendingQuestionStore()

    }}>

    <App />

    </Context.Provider>
        ,
  document.getElementById('root')
);
