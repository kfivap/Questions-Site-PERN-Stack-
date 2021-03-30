import {makeAutoObservable} from "mobx";

export default class PendingQuestions {


    constructor() {

        this._pendingList = []
        this._answeringIndex = null
        this._answeringText = null
        this._modalShow = false
        this._pendingId = null
        this._pendingIndex = null


        makeAutoObservable(this)
    }



    setPendingList(questions){

        this._pendingList = questions
    }

    setAnsweringIndex(index){
        this._answeringIndex = index
    }
    setAnsweringText(text){
        this._answeringText = text
    }

    setModalShow(bool){
        this._modalShow = bool
    }
    setPendingId(id){
        this._pendingId = id
    }
    setPendingIndex(index){
        this._pendingIndex = index
    }


    get pendingList(){
        return this._pendingList
    }

    get answeringIndex(){
        return this._answeringIndex
    }

    get answeringText(){
        return this._answeringText
    }

    get modalShow(){
        return this._modalShow
    }
    get pendingId(){
        return this._pendingId
    }
    get pendingIndex(){
        return this._pendingIndex
    }


}