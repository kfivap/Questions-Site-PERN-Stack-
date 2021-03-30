import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

const UserBio = observer(() => {

    const {profile} = useContext(Context)

    return (

            <Alert variant='primary' style={{textAlign: 'center'}}>
                <Image src={profile.userBio.profilePhoto} width={150} roundedCircle/>
                <h2>{profile.userBio.name}</h2>

                {profile.userBio.age || profile.userBio.sex ?
                    <h4>{profile.userBio.age ? <span>{profile.userBio.age}yo </span>: null}
                        {profile.userBio.sex ?
                            <span> {profile.userBio.sex}</span> : null}
                        {profile.userBio.location ?
                            <span> from {profile.userBio.location}</span> : null}

                    </h4> : null}

                {profile.shortBio}
            </Alert>

    );
})

export default UserBio;