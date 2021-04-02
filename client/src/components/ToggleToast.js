import React from 'react';

import Toast from "react-bootstrap/Toast";

const ToggleToast = ({show, text}) => {


            return (

                        <Toast  show={show}

                               animation={true}     style={{
                            position: 'fixed',
                            top: 10,
                            right: 10,
                            zIndex: 1000,
                            backgroundColor: "#00e0f8"
                        }}
                        >
                            <Toast.Header>
                                <Toast.Body>{text}!</Toast.Body>
                            </Toast.Header>

                        </Toast>

            );



};

export default ToggleToast;