import {makeAutoObservable} from "mobx";

export default class ProfileStore {


    constructor() {
        this._isAuth = false
        this._user = {}
        this._questionsList = [
            // {
            //     "id": 2,
            //     "from": 0,
            //     "questionText": "h111ellwwsdafsadfo",
            //     "answerText": "my answe2r is",
            //     "createdAt": "2021-03-28T19:03:47.751Z",
            //     "updatedAt": "2021-03-28T19:03:47.751Z",
            //     "userId": 1
            // },
            // {
            //     "id": 3,
            //     "from": 456,
            //     "questionText": "h111ellwwsdafsadfo",
            //     "answerText": "text answer",
            //     "createdAt": "2021-03-28T19:07:38.077Z",
            //     "updatedAt": "2021-03-28T19:07:38.077Z",
            //     "userId": 1
            // }
        ]

        this._userBio = {
            // "id": 1,
            // "name": "alexXXX",
            // "location": 'moscow',
            // "age": 20,
            // "sex": 'trans',
            // "profilePhoto": 'https://tanzolymp.com/images/default-non-user-no-photo-1.jpg',
            // "createdAt": "2021-03-28T16:59:44.240Z",
            // "updatedAt": "2021-03-28T16:59:44.240Z",
            // "userId": 1
        }

        this._fetchingPage = 1
        this._notFound = false

        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._isAuth = user
    }
    setQuestionsList(questions){
        this._questionsList = questions
    }
    setUserBio(bio){
        this._userBio = bio
    }
    setFetchingPage(page){
        this._fetchingPage = page
    }
    setNotFound(boolean){
        this._notFound = boolean
    }

    updateLikeCounter(index, number){
        this._questionsList[index].countLikes += number
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }

    get questionsList(){
        return this._questionsList
    }

    get userBio(){
        return this._userBio
    }

    get fetchingPage(){
        return this._fetchingPage
    }
    get notFound(){
        return this._notFound
    }

}