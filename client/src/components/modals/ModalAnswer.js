import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import {Context} from "../../index";
import {answerPending} from "../../http/answeredQuestionsAPI";
import {toJS} from "mobx";

const ModalAnswer = observer(({show, onHide}) => {


    const {pending, user} = useContext(Context)

    const [text, setText] = useState('')
    const [isAnswered, setIsAnswered] = useState(false)

    const answerHandler = async () => {

        try{
        await answerPending(user.userId, pending.pendingId, text)

        setIsAnswered(true)
        let tempList = toJS(pending.pendingList)
        tempList[pending.pendingIndex].questionText = "Answer sent"
        tempList[pending.pendingIndex].id = "sent"
        pending.setPendingList(tempList)



        setTimeout(() => {
            onHide()
            setTimeout(() => setIsAnswered(false), 100)
        }, 600)
        } catch (e) {
            window.location.reload()
        }
    }


    if (isAnswered) {
        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Success!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Answer has been sent</h2>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHide} className='m-1 float-left'>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Question text

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl as="textarea" aria-label="With textarea" placeholder={'answer text...'} maxLength="4096"
                             rows={15}
                             onChange={e => (setText(e.target.value))}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide} className='m-1 float-left'>Close</Button>
                <Button variant="outline-success" onClick={answerHandler}>Answer</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default ModalAnswer;