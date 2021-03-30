import { $authHost} from "./index";

export const askQuestion = async (from=0, userId, questionText) =>{

    // console.log(userId)

    const {data} = await $authHost.post
    (`api/questions/pending/ask/`, {
        from, userId, questionText
    })

    return data
}
