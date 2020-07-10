export const ActionsTypes = {
    SUCCESSFULLY: 'SUCCESSFULLY',
    UNSUCCESSFULLY: 'UNSUCCESSFULLY',
}

export const success = (data: any) => ({
    type: ActionsTypes.SUCCESSFULLY,
    data
})

export default {
    success,
}