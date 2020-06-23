import DreanItem from "Templates/DreanItem"

export const redactAddFormActionsList = {
    REDACT_DREAN_REQUEST: 'REDACT_DREAN_REQUEST',
    REDACT_DREAN_SUCCESSFULLY: 'REDACT_DREAN_SUCCESSFULLY',
    REDACT_DREAN_UNSUCCESSFULLY: 'REDACT_DREAN_UNSUCCESSFULLY',
}

export const redactDreanRequest = (id: string) => ({
    type: redactAddFormActionsList.REDACT_DREAN_REQUEST,
    id
})

export const redactDreanSuccessfully = (data: DreanItem) => ({
    type: redactAddFormActionsList.REDACT_DREAN_SUCCESSFULLY,
    data
})
