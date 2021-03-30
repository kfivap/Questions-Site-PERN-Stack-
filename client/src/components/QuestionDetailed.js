import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {getOneQuestion} from "../http/answeredQuestionsAPI";
import {useLocation} from "react-router-dom";
import Image from "react-bootstrap/Image";
import {Context} from "../index";

const QuestionDetailed = observer(() => {

    const {profile} = useContext(Context)
    const [question, setQuestion] = useState(null)
    const location = useLocation()

    const fetchData = async () => {
        const questionId = location.pathname.split('/')[2]
        console.log(questionId)
        const data = await getOneQuestion(questionId)
        setQuestion(data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    if (!question) {
        return <div>Loading</div>
    }

    return (
        <Card >
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <Card.Title>{question.questionText} from {question.from === 0 ? 'Anonymous' : question.userId}</Card.Title>
                <Card.Text>
                    <Image src={profile.userBio.profilePhoto} width={32} roundedCircle className='mr-2'/>
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