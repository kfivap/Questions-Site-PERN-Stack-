import React from 'react';
import {observer} from "mobx-react-lite";
import EditForm from "../components/EditForm";

const Edit = observer(() => {
    return (
        <div>
  Edit Page
            <EditForm/>
        </div>
    );
})

export default Edit;