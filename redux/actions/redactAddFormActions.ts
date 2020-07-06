import DreanItem from "Templates/DreanItem"

export const redactAddFormActionsList = {
    REDACT_DREAN_REQUEST: 'REDACT_DREAN_REQUEST',
    REDACT_DREAN_SUCCESSFULLY: 'REDACT_DREAN_SUCCESSFULLY',
    REDACT_DREAN_UNSUCCESSFULLY: 'REDACT_DREAN_UNSUCCESSFULLY',

    SAVE_DREAN_CHANGES: 'SAVE_DREAN_CHANGES',
    SAVE_DREAN_CHANGES_SUCCESSFULLY: 'SAVE_DREAN_CHANGES_SUCCESSFULLY',
    SAVE_DREAN_CHANGES_UNSUCCESSFULLY: 'SAVE_DREAN_CHANGES_UNSUCCESSFULLY',

}

export const redactDreanRequest = (id: string) => ({
    type: redactAddFormActionsList.REDACT_DREAN_REQUEST,
    id
})

export const redactDreanSuccessfully = (data: DreanItem) => ({
    type: redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY,
    data
})

export const redactDreanUnsuccessfully = () => ({
    type: redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY,
})

export const saveDreanChanges = (data: any) => ({
    type: redactAddFormActionsList.SAVE_DREAN_CHANGES,
    data
})

export const saveDreanChangesSuccessfully = () => ({
    type: redactAddFormActionsList.SAVE_DREAN_CHANGES_SUCCESSFULLY,
})

export const saveDreanChangesUnsuccessfully = () => ({
    type: redactAddFormActionsList.REDACT_DREAN_UNSUCCESSFULLY,
})

