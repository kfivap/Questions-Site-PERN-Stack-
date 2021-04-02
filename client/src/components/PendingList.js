import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {deletePendingQuestion} from "../http/PendingQuestionsAPI";
import {toJS} from "mobx";
import {parseDate} from "../functions/parseDate";
import {useHistory} from "react-router-dom";


const PendingList = observer(() => {

    const {pending, user} = useContext(Context)
    const history = useHistory()

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
        // 1+11
    }


    const linkToProfile = (id) => {
        history.push(`/user/${id}`)
        // history.push(`/user/${id}`)


    }



    return (
        <div>
            {pending.pendingList.map((i, index) =>
                <Card className='m-1' key={index +Math.random()}>

                    <div className='d-flex'>{parseDate(i.createdAt)} by&nbsp;
                        <span className={i.name !== 0 ? 'appLink' : ''}
                              onClick={i.name ? linkToProfile.bind(true, i.from) : null}>
                          {i.name ? i.name : "Anonymous"}
                        </span></div>
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