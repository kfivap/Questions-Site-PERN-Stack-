import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getOneQuestion} from "../http/answeredQuestionsAPI";
import {useLocation, useHistory} from "react-router-dom";
import Image from "react-bootstrap/Image";

import NotFoundPage from "./NotFoundPage";
import {getBio} from "../http/userAPI";
import Spinner from "react-bootstrap/Spinner";
import {parseDate} from "../functions/parseDate";
import ToggleToast from "./ToggleToast";
import {setLike} from "../http/likeAPI";
import {Context} from "../index";

const QuestionDetailed = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [question, setQuestion] = useState(null)
    const [loading, setLoading] = useState(true)
    const [prof, setProf] = useState(null)
    const [askedPerson, setAskedPerson] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState(false)

    const location = useLocation()

    const fetchData = async () => {
        const questionId = location.pathname.split('/')[2]

        const data = await getOneQuestion(questionId)
        // console.log(data.userId)
        if (!data) {
            setLoading(false)
            return
        }

        const profileData = await getBio(data.userId)
        if (data.from !== 0) {
            const askedData = await getBio(data.from)

            setAskedPerson(askedData)
        }
        setProf(profileData)
        setQuestion(data)

        setLoading(false)
        // console.log(prof)
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return <Spinner></Spinner>
    }
    if (!question) {

        return <NotFoundPage/>
    }
    const copyHandler = async (e) => {
        await navigator.clipboard.writeText(window.location.origin)
    }

    const linkToProfile = (id) => {
        history.push(`/user/${id}`)
    }


    const likeHandler = async (id) => {
        const data = await setLike(user.userId, id)

        if (data.message === 'Liked') {
            let a = question
            a.countLikes++
            console.log(a)
            setQuestion(a)
        }
        setShowToast(true)
        setToastText(data.message)

        setTimeout(() => {
            setShowToast(false)
        }, 2000)

    }


    return (


        <div>
            <ToggleToast show={showToast} text={toastText}/>
            <Card className='m-1 mt-2 border-dark'>
                {/*{JSON.stringify(i)}*/}
                {/*<h3>{i.id}</h3>*/}


                <span className='p-1 pl-2 border'><b>{question.questionText}</b>  by <span
                    className={question.from !== 0 ? 'appLink' : ''}
                    onClick={question.from !== 0 ? () => linkToProfile(askedPerson.id) : null}
                    // className={question.from !== 0 ? 'appLink' : ''}
                >{question.from === 0 ? 'Anonymous' : askedPerson.name}</span>

                </span>

                <span className='p-2 bg-light'>
                    <span
                        className={'appLink'}
                        onClick={() => linkToProfile(prof.id)}>
                        <Image
                            src={process.env.REACT_APP_API_URL + prof.profilePhoto}
                            width={64} roundedCircle
                            className='mr-2'/>
                        {prof.name}
                    </span>
                    <br/>
                    <span style={{marginLeft: 40}}> &nbsp;  &nbsp; &nbsp; &nbsp;{question.answerText}</span>
                </span>

                <div
                    className='d-flex justify-content-between align-items-center'
                    style={{height: '100%'}}
                >
                    <span className='p-2 ml-2' style={{fontSize: 18}}>
                        <b>{question.countLikes}</b> Likes
                    </span>

                    <div className={'ml-1 mb-1'}>
                        {parseDate(question.createdAt)}
                    </div>
                    <div>
                        <Button
                            onClick={() => linkToProfile(prof.id)}
                            size="sm"
                            className='mr-1 ' variant="outline-primary" type="submit">
                            Profile
                        </Button>
                        <Button
                            onClick={copyHandler}
                            size="sm"
                            className='mr-1 ' variant="outline-dark" type="submit">
                            Copy
                        </Button>
                        <Button
                            onClick={() => likeHandler(question.id)}
                            size="sm"
                            className='mr-1 ' variant="danger" type="submit"
                        >
                            Like!
                        </Button>
                    </div>

                </div>

            </Card>

        </div>

    );
})

export default QuestionDetailed;