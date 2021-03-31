import React, { useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getOneQuestion} from "../http/answeredQuestionsAPI";
import {useLocation} from "react-router-dom";
import Image from "react-bootstrap/Image";

import NotFoundPage from "./NotFoundPage";
import {getBio} from "../http/userAPI";
import Spinner from "react-bootstrap/Spinner";

const QuestionDetailed = observer(() => {


    const [question, setQuestion] = useState(null)
    const [loading, setLoading] = useState(true)
    const [prof, setProf] = useState(null)
    const location = useLocation()
    //

    const fetchData = async () => {
        const questionId = location.pathname.split('/')[2]
        // console.log(questionId)
        const data = await getOneQuestion(questionId)
        // console.log(data.userId)
        const profileData = await getBio(2)
        setProf(profileData)
        setQuestion(data)
        setLoading(false)
        // console.log(data)
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

    return (
        <Card >
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Title>{question.questionText} from {question.from === 0 ? 'Anonymous' : question.userId}</Card.Title>
                <Card.Text>
                    <Image src={process.env.REACT_APP_API_URL + prof.profilePhoto} width={32} roundedCircle className='mr-2'/>
                    {question.answerText}

                </Card.Text>
                <span className='ml-3 mt-1 mb-1'>
                    <Button
                        // onClick={likeHandler}
                        className='m-1 float-left' variant="danger" type="submit">
                        Like!
                    </Button>
                        <Button
                            // onClick={copyHandler.bind(true, i.id)}
                            className='m-1 float-left' variant="outline-dark" type="submit">
                        Copy
                    </Button>
                        </span>
            </Card.Body>
        </Card>
    );
})

export default QuestionDetailed;