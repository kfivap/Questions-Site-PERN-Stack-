import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import PendingList from "../components/PendingList";
import {Context} from "../index";
import {getPendingQuestions} from "../http/PendingQuestionsAPI";
import ModalAnswer from "../components/modals/ModalAnswer";
import {toJS} from "mobx";

const Pending = observer(() => {

    const {pending} = useContext(Context)
    const {user} = useContext(Context)
    const [page, setPage] = useState(1)

    const loadFunction = async ()=>{
        const fetchData = await getPendingQuestions(user.userId, page, 10)



        pending.setPendingList([...toJS(pending.pendingList), ...fetchData.rows])

        setPage(prevState => prevState+1)

    }

    useEffect(()=>{
        if (toJS(pending.pendingList.length < 10)) {
            loadFunction()
        }
    }, [])


    window.onscroll = ()=> {
        if ((window.innerHeight + window.scrollY) > document.body.offsetHeight+2) {

            loadFunction()

        }
    };


    return (
        <div>
            <button onClick={loadFunction}
            >fetch</button>
            Pending Questions
            <ModalAnswer show={pending.modalShow}
                         onHide={() => pending.setModalShow(false)}
            />
            <PendingList/>
        </div>
    );
})

export default Pending;