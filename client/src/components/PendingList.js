import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {deletePendingQuestion} from "../http/PendingQuestionsAPI";
import {toJS} from "mobx";
import {parseDate} from "../functions/parseDate";


const PendingList = observer(() => {

    const {pending, user} = useContext(Context)

    const deleteHandler = async (questionId, index) => {

        // console.log(questionId, index)
      let data =  await deletePendingQuestion(user.userId, questionId)

        if(data===1){
            let tempList = toJS(pending.pendingList)
            tempList[index].questionText = "Question deleted"
            tempList[index].id = "deleted"

            pending.setPendingList(tempList)
        } else {
            window.location.reload()
        }

    }

    const answerHandler = (id, index)=>{
        pending.setModalShow(true)
        pending.setPendingId(id)
        pending.setPendingIndex(index)

    }


    return (
        <div>
            {pending.pendingList.map((i, index) =>
                <Card className='m-1' key={index +Math.random()}>

                    <div className='d-flex'>{parseDate(i.createdAt)} from {i.from ? '*Имя пользователя' : "Anonymous"}</div>
                    <div><b>{i.questionText}</b></div>

                    {(i.id === "deleted" || i.id ==='sent') ? null :

                        <div  className='m-1 float-right'>
                            <Button
                                    onClick={()=>{answerHandler(i.id, index)}}
                                    className='m-1 ml-2 float-right'
                                    variant="outline-success" type="submit">
                                Answer {i.id}
                            </Button>

                            <Button
                                    className='m-1 float-right'
                                    onClick={() => {
                                        deleteHandler(i.id, index)
                                    }}
                                    variant="outline-danger" type="submit">
                                Delete
                            </Button>
                        </div>
                    }


                </Card>
            )}

        </div>
    );
})

export default PendingList;