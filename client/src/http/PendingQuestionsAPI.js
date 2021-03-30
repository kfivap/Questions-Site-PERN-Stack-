import { $authHost} from "./index";

export const getPendingQuestions = async (userId, page=1, limit=20) =>{

    const {data} = await $authHost.get
    (`api/questions/pending/show?userId=${userId}&page=${page}&limit=${limit}`,)

    return data
}

export const deletePendingQuestion = async (userId, questionId) =>{

    const {data} = await $authHost.delete
    (`api/questions/pending/delete/`, {
        data: {
            userId, questionId
        }
})

    return data
}
//
// export const answerPendingQuestion = async (userId, questionId) =>{
//
//     const {data} = await $authHost.delete
//     (`api/questions/pending/delete/`, {
//         data: {
//             userId, questionId
//         }
// })
//
//     return data
// }
