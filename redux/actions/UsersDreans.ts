export const userDreansActionsList = {
    GET_ALL_USER_DREANS: 'GET_ALL_USER_DREANS'
}

export const getAllUserDreans = (user_id: string) => {
    type: userDreansActionsList.GET_ALL_USER_DREANS
    user_id
}