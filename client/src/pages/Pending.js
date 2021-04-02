import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import PendingList from "../components/PendingList";
import {Context} from "../index";
import {getPendingQuestions} from "../http/PendingQuestionsAPI";
import ModalAnswer from "../components/modals/ModalAnswer";
import {toJS} from "mobx";
import {getManyBios} from "../http/userAPI";

const Pending = observer(() => {

    const {pending} = useContext(Context)
    const {user} = useContext(Context)
    const [page, setPage] = useState(1)

    const loadFunction = async ()=>{
        const fetchData = await getPendingQuestions(user.userId, page, 10)

        console.log(fetchData)
        let idNameArray = []
        for(let i=0; i<fetchData.rows.length; i++){
            idNameArray.push(fetchData.rows[i].from)
        }
        const fetchBios = await getManyBios(idNameArray)
console.log(fetchBios)
        for(let i=0; i<fetchData.rows.length; i++){
            for(let j=0; j<idNameArray.length; j++){
                if(fetchData.rows[i].from === idNameArray[j]){
                    // console.log(fetchData.rows[i].from , idNameArray[j])
                    if(fetchBios.filter(i=>i.id===idNameArray[j])[0]){
                        fetchData.rows[i].name =fetchBios.filter(i=>i.id===idNameArray[j])[0].name
                    }
                    break
                }

            }
        }
        console.log(fetchData)


        pending.setPendingList([...toJS(pending.pendingList), ...fetchData.rows])

        setPage(prevState => prevState+1)

    }

    useEffect(()=>{
        if (toJS(pending.pendingList.length < 10)) {
            loadFunction()
        }
        return (()=>{
            pending.setPendingList([])
        })
    }, [])
    // useEffect(()=>{
    //
    // }, [])


    window.onscroll = ()=> {
        if ((window.innerHeight + window.scrollY) > document.body.offsetHeight+2) {

            loadFunction()

        }
    };


    return (
        <div>
            {/*<button onClick={loadFunction}*/}
            {/*>fetch</button>*/}
            Pending Questions
            <ModalAnswer show={pending.modalShow}
                         onHide={() => pending.setModalShow(false)}
            />
            <PendingList/>
        </div>
    );
})

export default Pending;