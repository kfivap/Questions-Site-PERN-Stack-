import React, {useContext} from 'react';
import {Context} from "../index";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {

    const {user} = useContext(Context)

    const history = useHistory()

    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        window.location.reload()
    }

    return (
        <Navbar bg="dark" variant="dark">
<Container>
    <NavLink style={{color: "white"}}to={MAIN_ROUTE}>Q.me </NavLink>
    {user.isAuth ?
        <Nav className="ml-2" style={{color:"white"}}>
            <Button variant={'outline-light'}
                    onClick={()=>history.push(`/user/${user.userId}`)}
            >My Page</Button>



            <Button variant={'outline-light'}
                    className='ml-2'
            onClick={()=>history.push('/pending')}
            >Pending</Button>





            {/*<Button variant={'outline-light'}*/}
            {/*        onClick={()=>history.push('/user/1')}*/}
            {/*>1</Button>*/}


            {/*<Button variant={'outline-light'}*/}
            {/*        onClick={()=>history.push('/user/2')}*/}
            {/*>2</Button>*/}


            {/*<Button variant={'outline-light'}*/}
            {/*        onClick={()=>history.push('/user/3')}*/}
            {/*>3</Button>*/}

            <Button variant={'outline-light'}
                    className='ml-2'
                    onClick={()=>history.push('/edit')}
            >Edit</Button>
            <Button variant={'outline-light'} className={'ml-2'}

                    onClick={()=>logOut()}
            >Выйти</Button>
        </Nav>
        :
        <Nav className="ml-auto" style={{color:"white"}}>

            <Button variant={'outline-light'} onClick={()=>history.push(LOGIN_ROUTE)
            }>Авторизация</Button>
        </Nav>

    }
</Container>
        </Navbar>

    );
});
export default NavBar;