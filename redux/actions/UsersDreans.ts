export const userDreansActionsList = {
    USER_DREANS_REQUEST: 'USER_DREANS_REQUEST',
    USER_DREANS_GET_SUCCESSFULLY: 'USER_DREANS_GET_SUCCESSFULLY',
    USER_DREANS_GET_UNSUCCESSFULLY: 'USER_DREANS_GET_UNSUCCESSFULLY', 
}

export const getAllUserDreans = (user_id: string) => ({
    type: userDreansActionsList.USER_DREANS_REQUEST,
    user_id
})

export const userDreansGetSuccessfully = (dreansArray: []) => ({
    type: userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY,
    dreansArray
})