import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/Navbar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";


const App = observer(() => {

    const {user}=useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            check().then(data=>{
                user.setUser(true)
                user.setIsAuth(true)
                user.setUserId(data.userId)
            }).finally(()=> setLoading(false))

            }, 0)

    })

    if(loading){
        return <Spinner animation={'grow'}/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <Container style={{maxWidth: 760}}>
                <AppRouter/></Container>
        </BrowserRouter>
    );
})

export default App;
