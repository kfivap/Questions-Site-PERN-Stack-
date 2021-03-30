import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useHistory} from 'react-router-dom'


const QuestionsList = observer(() => {

    const {profile} = useContext(Context)
    const history = useHistory()

    const likeHandler = () => {
        alert('i am button')
    }

    const detailsHandler = (e) => {
        console.log(e)
        history.push(`/question/${e}`)

    }

    const copyHandler = async (e) => {
     await navigator.clipboard.writeText(window.location.origin + '/question/' + e)
    }


    return (
        <div>
            {profile.questionsList.map((i, index) =>
                <Card className='m-1' key={index}>
                    {/*{JSON.stringify(i)}*/}
<h3>{i.id}</h3>
                    <div>{i.createdAt} from {i.from ? '*Имя пользователя' : "Anonymous"}</div>
                    <span><b>{i.questionText}</b></span>

                    <span>{i.answerText}</span>

                    <span className='ml-3 mt-1 mb-1'>
                    <Button
                        onClick={likeHandler}
                        className='m-1 float-left' variant="danger" type="submit">
                        Like!
                    </Button>
                        <Button
                            onClick={detailsHandler.bind(true, i.id)}
                            className='m-1 float-left' variant="outline-primary" type="submit">
                        Details
                    </Button>
                        <Button
                            onClick={copyHandler.bind(true, i.id)}
                            className='m-1 float-left' variant="outline-dark" type="submit">
                        Copy
                    </Button>
                        </span>

                </Card>
            )}

        </div>
    );
})

export default QuestionsList;