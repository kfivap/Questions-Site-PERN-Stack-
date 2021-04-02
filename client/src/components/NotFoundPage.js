import React  from 'react';
import {observer} from "mobx-react-lite";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import {useHistory} from 'react-router-dom'

const NotFoundPage = observer(() => {

    const history = useHistory()


    const returnToMain  = () =>{
        history.push('/')
    }



    return (
        <Alert variant='warning'>
            <h2>404! The requested data not found</h2>
            <Card onClick={returnToMain} className='m-4'>
                <h4 className='text-center'
                    onClick={returnToMain}
                    style={{cursor: "pointer"}}
                >Вернуться на главную</h4>
            </Card>
        </Alert>
    );
})

export default NotFoundPage;