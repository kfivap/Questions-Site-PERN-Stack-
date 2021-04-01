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
    const [stopLoad, setStopLoad] = useState(false) //if no more questions
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchQuestions = async () => {

        const fetchData = await getQuestions(profile.userBio.userId, profile.fetchingPage, 3).then()

        profile.setFetchingPage(profile.fetchingPage + 1)

        if (fetchData.rows.length === 0) {
            setStopLoad(true)
        }
        profile.setQuestionsList([...toJS(profile.questionsList), ...fetchData.rows])
    }


    useEffect(() => {
        console.log('useEffect')
        setStopLoad(false)
        setNotFound(false)
        profile.setFetchingPage(1)

        async function fData() {
            try {
                profile.setQuestionsList([])

                const data = await getBio(userId)
                profile.setUserBio(data)
                await fetchQuestions()
                setLoading(false)
            } catch (e) {
                if (e.message === 'Request failed with status code 404') {
                    setNotFound(true)
                }

                setLoading(false)

            }

        }

        fData()


    }, [userId])


    window.onscroll = function (ev) {
        if ((window.innerHeight + window.scrollY) > document.body.offsetHeight + 2 && !stopLoad) {
            fetchQuestions()

        }
    };
    if (loading) {
        return <Spinner></Spinner>
    }

    if (notFound) {
        return <NotFoundPage/>
    }

    return (
        <div>

            <button onClick={fetchQuestions}>fetch</button>
            <UserBio/>
            <AskForm/>
            <QuestionsList/>
        </div>
    );
})

export default Profile;