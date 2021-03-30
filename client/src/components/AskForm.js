import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl"
import Card from "react-bootstrap/Card";
import {askQuestion} from "../http/askQuestionAPI";
import Alert from "react-bootstrap/Alert";
import {Context} from "../index";


const AskForm = observer(() => {

    const {user} = useContext(Context)

    // const questionId = parseInt(useLocation().pathname.replace(/^\D+/g, ''))

    const [text, setText] = useState('')
    const [alertShow, setAlertShow] = useState(false)
    const [anonymous, setAnonymous] = useState(true)


    const anonymousHandler = () =>{
        setAnonymous(prevState => !prevState)

    }


    const askHandler = async () => {

        let from = anonymous ? 0 : user.userId

        if (!(text.trim() === '')) {

            for(let i=0; i<50; i++){
                await askQuestion(from, 2, text.trim()+i)
            }

            // await askQuestion(from, 2, text.trim())
            setText('')
            setAlertShow(true)
            setTimeout(()=>{
                setAlertShow(false)
            }, 1700)
        }

    }





    return (
        <Card>
            {alertShow ?
                <span>
                <Alert  variant={'success'} show={alertShow}

                >
                    <h3 className='text-center p-2'>Question asked!</h3>
                    <h5 className='border text-center p-2 text-dark'
                        onClick={()=>setAlertShow(false)}
                    >Ask one more</h5>
                </Alert>

                </span>
                :

                <span><Card.Header>Ask me a question</Card.Header>
                <div className='p-2'>
                <FormControl as="textarea" placeholder={'Ask me!'} maxLength="255"
                value={text}
                onChange={e => setText(e.target.value)}

                />
                <span className='user-select-none' onClick={anonymousHandler}>
                <input type='checkbox' name='anon' checked={anonymous} onChange={()=>{}}/>
                <label htmlFor={'anon'}>&nbsp; Ask anonymously</label>
                    </span>
                <Button
                onClick={askHandler}
                className='m-1 float-right' variant="primary" type="submit">
                Ask
                </Button>
                </div></span>
            }


        </Card>

    );
})

export default AskForm;