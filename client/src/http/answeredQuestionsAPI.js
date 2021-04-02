import {$authHost, $host} from "./index";



export const getQuestions = async (userId, page=1, limit=20) =>{

    const {data} = await $authHost.get
    (`api/questions/answered/show?userId=${userId}&page=${page}&limit=${limit}`,)

    return data
}



export const answerPending = async (userId, pendingId, answerText ) =>{

    const {data} = await $authHost.post
    (`api/questions/answered/answer/`,
        {
            userId, pendingId, answerText
        })

    return data
}




export const getOneQuestion = async (questionId) =>{

    const {data} = await $host.get
    (`api/questions/answered/showOne?questionId=${questionId}`,)

    return data
}



