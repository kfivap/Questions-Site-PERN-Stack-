import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation} from 'react-router-dom'
import QuestionsList from "../components/QuestionsList";
import UserBio from "../components/UserBio";
import AskForm from "../components/AskForm";
import {getQuestions} from "../http/answeredQuestionsAPI";
import {Context} from "../index";
import {toJS} from "mobx";
import {getBio} from "../http/userAPI";
import NotFoundPage from "../components/NotFoundPage";
import Spinner from "react-bootstrap/Spinner";

const Profile = observer(() => {

    const {profile} = useContext(Context)
    const userId = useLocation().pathname.split('/')[2]
    const [page, setPage] = useState(1)

    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchQuestions = async () => {

        const fetchData = await getQuestions(userId, page, 12)
        setPage(prevState => prevState + 1)
        profile.setQuestionsList([...toJS(profile.questionsList), ...fetchData.rows])

    }

    useEffect(async () => {

try {
    const data = await getBio(userId)
    console.log(data)
    profile.setUserBio(data)
    await fetchQuestions()
    setLoading(false)
} catch (e) {
    if(e.message = 'Error: Request failed with status code 404'){
        setNotFound(true)
    }

    setLoading(false)

}


    }, [])


    window.onscroll = function (ev) {
        if ((window.innerHeight + window.scrollY) > document.body.offsetHeight + 2) {
            fetchQuestions()

        }
    };
    if(loading){
        return <Spinner></Spinner>
    }

    if(notFound){
        return <NotFoundPage/>
    }

    return (
        <div>

            <button onclick={fetchQuestions}>fetch</button>
            <UserBio/>
            <AskForm/>
            <QuestionsList/>
        </div>
    );
})

export default Profile;