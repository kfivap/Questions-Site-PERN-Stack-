import { $authHost, $host} from "./index";

export const setLike = async ( userId, questionId) =>{

    // console.log(userId)

    const {data} = await $authHost.post
    (`api/likes/setLike/`, {
        userId, questionId
    })

    return data
}
