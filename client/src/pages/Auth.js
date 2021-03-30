import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nick, setNick] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password, nick)
                console.log(data)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push('/')
            // window.location.reload();
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className={'d-flex justify-content-center align-items-center'}
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className={'p-5'}>
                <h2 className={'m-auto'}>

                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <Form className={'d-flex flex-column'}>
                    <div className='mt-2'><span className='ml-2'>Email</span>
                    <Form.Control
                        className={'mb-3'}
                        placeholder={"Type your email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    </div>
                    {isLogin ?
                        null :
                        <div><span className='ml-2'>Nickname</span>
                        <Form.Control
                            className={'mb-3'}
                            placeholder={"Type your nick"}
                            value={nick}
                            onChange={e => setNick(e.target.value)}
                            t
                        /></div>
                    }
                    <div><span className='ml-2'>Password</span>
                    <Form.Control
                        className={'mb-3'}
                        placeholder={"Type your password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={'password'}
                    /></div>

                </Form>
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">

                    {isLogin ?
                        <div>
                            Don`t have account?&nbsp;
                            <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                        </div>
                        :
                        <div>
                            Already have account?&nbsp;
                            <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                        </div>

                    }


                    <Button
                        variant={'outline-success'}
                        onClick={click}
                    >
                        {isLogin ? 'Login' : "Register"}
                    </Button>
                </Row>
            </Card>
        </Container>
    );
})

export default Auth;