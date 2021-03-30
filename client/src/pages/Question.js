import React from 'react';
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import QuestionDetailed from "../components/QuestionDetailed";

const Question = observer(() => {


    const questionId = parseInt(useLocation().pathname.replace( /^\D+/g, ''))



    return (
        <div>
            Question id: {questionId}
<QuestionDetailed/>
        </div>
    );
})

export default Question;