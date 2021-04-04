import React from 'react';
// import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react-lite";
import RecentQuestions from "../components/RecentQuestions";

const Main = observer(() => {
    return (
        <div>
            <RecentQuestions/>
        </div>
    );
})

export default Main;