export const userDreansActionsList = {
    USER_DREANS_GET_REQUEST: 'USER_DREANS_GET_REQUEST',
    USER_DREANS_GET_SUCCESSFULLY: 'USER_DREANS_GET_SUCCESSFULLY',
    USER_DREANS_GET_UNSUCCESSFULLY: 'USER_DREANS_GET_UNSUCCESSFULLY',

    USER_DREAN_DELETE_REQUEST: 'USER_DREAN_DELETE_REQUEST',
    USER_DREAN_DELETE_SUCCESSFULLY: 'USER_DREAN_DELETE_SUCCESSFULLY',
    USER_DREAN_DELETE_UNSUCCESSFULLY: 'USER_DREAN_DELETE_UNSUCCESSFULLY',
}

export const getAllUserDreans = () => ({
    type: userDreansActionsList.USER_DREANS_GET_REQUEST,
})

export const userDreansGetSuccessfully = (dreansArray: []) => ({
    type: userDreansActionsList.USER_DREANS_GET_SUCCESSFULLY,
    dreansArray
})

export const deleteUserDrean = (drean_id) => ({
    type: userDreansActionsList.USER_DREAN_DELETE_REQUEST,
    drean_id,
})

export const deleteUserDreanSuccessfully = (id: string) => ({
    type: userDreansActionsList.USER_DREAN_DELETE_SUCCESSFULLY,
    id
})