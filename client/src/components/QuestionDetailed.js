import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getOneQuestion} from "../http/answeredQuestionsAPI";
import {useLocation, useHistory} from "react-router-dom";
import Image from "react-bootstrap/Image";

import NotFoundPage from "./NotFoundPage";
import {getBio} from "../http/userAPI";
import Spinner from "react-bootstrap/Spinner";

const QuestionDetailed = observer(() => {

    const history = useHistory()
    const [question, setQuestion] = useState(null)
    const [loading, setLoading] = useState(true)
    const [prof, setProf] = useState(null)
    const [askedPerson, setAskedPerson] = useState(null)

    const location = useLocation()
    //
    // console.log(notFound)
    const fetchData = async () => {
        const questionId = location.pathname.split('/')[2]

        const data = await getOneQuestion(questionId)
        // console.log(data.userId)
        if (!data) {
            setLoading(false)
            return
        }

        const profileData = await getBio(data.userId)
        if(data.from !== 0){
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

console.log(prof)
    return (
        <Card>

            <Card.Body>
                <Card.Title

                >{question.questionText} <small>by <span
                    onClick={question.from !== 0 ?() => linkToProfile(askedPerson.id) : null}
                    className={question.from !== 0 ? 'appLink' : ''}
                >{question.from === 0 ? 'Anonymous' : askedPerson.name}</span></small></Card.Title>
                <Card.Text>
                    <span className={'appLink'} onClick={() => linkToProfile(prof.id)}> <Image
                        src={process.env.REACT_APP_API_URL + prof.profilePhoto}
                        width={24} roundedCircle
                        className='mr-2'/>{prof.name}</span><br/>
                    <span style={{marginLeft: 32}}>{question.answerText}</span>

                </Card.Text>

                <span className='ml-3 mt-1 mb-1'>
                    <Button
                        // onClick={likeHandler}
                        className='m-1 float-left' variant="danger" type="submit">
                        Like!
                    </Button>
                        <Button
                            onClick={copyHandler}
                            className='m-1 float-left' variant="outline-dark" type="submit">
                        Copy
                    </Button>
                        </span>
            </Card.Body>
        </Card>
    );
})

export default QuestionDetailed;