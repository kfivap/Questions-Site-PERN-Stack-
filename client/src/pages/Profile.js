import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useLocation} from 'react-router-dom'
import QuestionsList from "../components/QuestionsList";
import UserBio from "../components/UserBio";
import AskForm from "../components/AskForm";
import {getQuestions} from "../http/answeredQuestionsAPI";
import {Context} from "../index";
import {toJS} from "mobx";
import {getBio, getManyBios} from "../http/userAPI";
import NotFoundPage from "../components/NotFoundPage";
import Spinner from "react-bootstrap/Spinner";

const Profile = observer(() => {

    const {profile} = useContext(Context)
    const userId = useLocation().pathname.split('/')[2]
    const [stopLoad, setStopLoad] = useState(false) //if no more questions
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchQuestions = async () => {

        const fetchData = await getQuestions(profile.userBio.userId, profile.fetchingPage, 10)

        let idNameArray = []
        for(let i=0; i<fetchData.rows.length; i++){
            idNameArray.push(fetchData.rows[i].from)
        }
        if (fetchData.rows.length === 0) {
            setStopLoad(true)
        }

        const fetchBios = await getManyBios(idNameArray)

        for(let i=0; i<fetchData.rows.length; i++){
            for(let j=0; j<idNameArray.length; j++){
                if(fetchData.rows[i].from === idNameArray[j]){
                    // console.log(fetchData.rows[i].from , idNameArray[j])
                    if(fetchBios.filter(i=>i.id===idNameArray[j])[0]){
                        fetchData.rows[i].name =fetchBios.filter(i=>i.id===idNameArray[j])[0].name
                    }
                    break
                }

            }
        }

        profile.setFetchingPage(profile.fetchingPage + 1)


        profile.setQuestionsList([...toJS(profile.questionsList), ...fetchData.rows])
    }


    useEffect(() => {

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

                    profile.setNotFound(true)
                }

                setLoading(false)

            }

        }

        fData()

        return(()=>{
            profile.setQuestionsList([])
            profile.setFetchingPage(1)
        })


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

            {/*<button onClick={}>fetch</button>*/}
            <UserBio/>
            <AskForm/>
            <QuestionsList/>
        </div>
    );
})

export default Profile;