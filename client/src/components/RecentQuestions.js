import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useHistory} from 'react-router-dom'
import {setLike} from "../http/likeAPI";
import ToggleToast from "./ToggleToast";

import {parseDate} from "../functions/parseDate";
import {showRecent} from "../http/answeredQuestionsAPI";



const RecentQuestions = observer(() => {

    const {profile, user} = useContext(Context)
    const history = useHistory()
    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState('')
    const [questionsList, setQuestionsLis] = useState([])


    useEffect(()=>{

        async function fetchData() {
            const getQuestions = await showRecent()
            console.log(getQuestions)
            for(let i=0;i<getQuestions.rows.length;i++){
                if(getQuestions.rows[i].answerText.length>200){
                    getQuestions.rows[i].answerText = getQuestions.rows[i].answerText.slice(0, 200)+'...'
                }
                if(getQuestions.rows[i].questionText.length>127){
                    getQuestions.rows[i].questionText = getQuestions.rows[i].questionText.slice(0, 127)+'...'
                }

            }



            setQuestionsLis(getQuestions.rows)
        }

        fetchData()

    },[])


    const detailsHandler = (e) => {

        history.push(`/question/${e}`)

    }

    const copyHandler = async (e) => {
        await navigator.clipboard.writeText(window.location.origin + '/question/' + e)
    }

    const linkToProfile = (id) => {
        if(profile.userBio.userId === id){
            window.scrollTo(0, 0)
            return
        }
        profile.setQuestionsList([''])
        profile.setFetchingPage(1)
        profile.setUserBio('')
        history.push(`/user/${id}`)

    }



    return (
        <div>
            Recent Questions
            <ToggleToast show={showToast} text={toastText}/>
            {questionsList.map((i, index) =>
                <Card className='m-1 mt-2 border-dark' key={index}>


                    <span className='p-1 pl-2 border'><b>{i.questionText} </b>

                    </span>
                    <span className='p-2 bg-light'>{i.answerText}
                        <Button
                            onClick={detailsHandler.bind(true, i.id)}
                            size="sm"
                            className='mr-1 float-right ' variant="outline-primary" type="submit">
                            Details
                        </Button>
                    </span>


                </Card>
            )}

        </div>
    );
})

export default RecentQuestions;