import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useHistory, useLocation} from 'react-router-dom'
import {setLike} from "../http/likeAPI";
import ToggleToast from "./ToggleToast";

import {parseDate} from "../functions/parseDate";
import {getQuestions} from "../http/answeredQuestionsAPI";
import {getBio, getManyBios} from "../http/userAPI";
import {toJS} from "mobx";
import Spinner from "react-bootstrap/Spinner";
import NotFoundPage from "./NotFoundPage";



const QuestionsList = observer(() => {

    const {profile, user} = useContext(Context)
    const history = useHistory()
    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState('')
    const userId = useLocation().pathname.split('/')[2]
    const [stopLoad, setStopLoad] = useState(false) //if no more questions
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true)



    const likeHandler = async (id, index) => {
        setShowToast(false)
        const data = await setLike(user.userId, id)
        setShowToast(true)
        setToastText(data.message)
        setTimeout(() => {
            setShowToast(false)
        }, 2000)
        if (data.message === 'Liked') {
            profile.updateLikeCounter(index, 1)
        }
    }

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
            <ToggleToast show={showToast} text={toastText}/>
            {profile.questionsList.map((i, index) =>
                <Card className='m-1 mt-2 border-dark' key={index}>
                    {/*{JSON.stringify(i)}*/}
                    <h3>{i.id}</h3>


                    <span className='p-1 pl-2 border'><b>{i.questionText} </b>
                        by <span className={i.from !== 0 ? 'appLink' : ''}
                        onClick={linkToProfile.bind(true, i.from)}
                        >
                          {i.name ? i.name : "Anonymous"}</span>
                    </span>
                    <span className='p-2 bg-light'>{i.answerText}</span>

                    <div className='d-flex justify-content-between align-items-center'
                    style={{height: '100%'}}
                    >
                        <span className='p-2 ml-2' style={{fontSize: 18}}><b>{i.countLikes}</b> Likes</span>
                        <div className={'ml-2 mb-1'}>{parseDate(i.createdAt)}</div>
                        <div>

                            <Button
                                onClick={detailsHandler.bind(true, i.id)}
                                size="sm"
                                className='mr-1 ' variant="outline-primary" type="submit">
                                Details
                            </Button>
                            <Button
                                onClick={copyHandler.bind(true, i.id)}
                                size="sm"
                                className='mr-1 ' variant="outline-dark" type="submit">
                                Copy
                            </Button>
                            <Button
                                onClick={likeHandler.bind(true, i.id, index)}
                                size="sm"
                                className='mr-1 ' variant="danger" type="submit"
                            >
                                Like!
                            </Button>
                        </div>

                    </div>

                </Card>
            )}

        </div>
    );
})

export default QuestionsList;