import DreanItem from "Templates/DreanItem"

export const redactAddFormActionsList = {
    REDACT_DREAN_REQUEST: 'REDACT_DREAN_REQUEST',
    REDACT_DREAN_SUCCESSFULLY: 'REDACT_DREAN_SUCCESSFULLY',
    REDACT_DREAN_UNSUCCESSFULLY: 'REDACT_DREAN_UNSUCCESSFULLY',

    LOAD: 'LOAD',
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

export interface IInputField {
    name: string;
    value: string;
}


export const loadRedactAddItem = (data: any) => ({
    type: redactAddFormActionsList.LOAD,
    data
})
