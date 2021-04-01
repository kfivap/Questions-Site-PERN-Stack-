import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Form from 'react-bootstrap/Form'

import Button from "react-bootstrap/Button";
import {getBio, setBio} from "../http/userAPI";
import {Context} from "../index";
import {toJS} from "mobx";

const EditForm = observer(() => {

    const {user} = useContext(Context)

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [age, setAge] = useState('')
    const [sex, setSex] = useState('')
    const [shortBio, setShortBio] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
        async function setData() {
            const data = await getBio(user.userId)
            user.setUserBio(data)
            let bio =toJS(user.userBio)
            setName(bio.name)
            setLocation(bio.location)
            setSex(bio.sex)
            setAge(bio.age)
            setShortBio(bio.shortBio)
            console.log(bio)
        }
        setData()
    }, [])


    const selectFile = e => {
        if (
            e.target.files[0].name.toLocaleLowerCase().endsWith('.png') ||
            e.target.files[0].name.toLocaleLowerCase().endsWith('.jpg') ||
            e.target.files[0].name.toLocaleLowerCase().endsWith('.jpeg')
        ) {
            setFile(e.target.files[0])
        }

    }
    const editBio = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('location', location)
        formData.append('age', `${age}`)
        formData.append('sex', sex)
        formData.append('shortBio', shortBio)
        formData.append('img', file)
        formData.append('userId', user.userId)
        setBio(formData).then(() => {
        })
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.File
                        id="exampleFormControlFile1"
                        label="Example file input"
                        accept=".jpg,.png"
                        onChange={selectFile}
                    />
                </Form.Group>


                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Age</Form.Label>
                    <small>&nbsp; (no needed real, just from 0 to 2147483647)</small>
                    <Form.Control
                        placeholder="Age"
                        value={age}
                        type={'number'}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Sex</Form.Label>
                    <small>&nbsp; (type any gender you think yourself, tolerance + BLM, bro)</small>
                    <Form.Control
                        placeholder="Sex"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        placeholder="Bio"
                        value={shortBio}
                        onChange={(e) => setShortBio(e.target.value)}
                    />
                </Form.Group>

            </Form>


            <Button
                variant="outline-success"
                className='float-right mr-4'
                onClick={editBio}
            >Update!</Button>
        </div>
    );
})

export default EditForm;