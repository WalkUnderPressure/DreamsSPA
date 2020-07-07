import React, { Component } from 'react';

export enum PopUpMessageTypes {
    SUCCESS = 'SUCCESS',
    UNSUCCESS = 'UNSUCCESS',
    MESSAGE = 'MESSAGE',
}

interface IPopUpMessageProps {
    title: string;
    type: PopUpMessageTypes;
    id: string;
}
interface IPopUpMessageState {
    isDismissed: boolean;
}

class PopUpMessage extends Component<IPopUpMessageProps, IPopUpMessageState> {
    constructor(props) {
        super(props);
        this.state = { isDismissed: false }
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    dismissAlert() {
        this.setState({
            isDismissed: true
        });
    }

    render() {
        const {children, title, type, id} = this.props;

        let messageColor: string = '';
        switch (type) {
            case PopUpMessageTypes.SUCCESS:
                messageColor = 'green'
                break;
            case PopUpMessageTypes.UNSUCCESS:
                messageColor = 'red'
                break;
            default:
                messageColor = 'gray'
                break;
        }

        return this.state.isDismissed ? null : (
            <div className={'absolute top-0 right-0 flex flex-row bg-gray-500 rounded p-2'}
                role="alertdialog"
                aria-labelledby={id}>
                <div className={`flex flex-col px-3 py-4 border-0 border-solid border-l-8 border-${messageColor}-500`}>
                    <h1 className='text-center font-black text-base mb-3 rounded bg-white' id={id}>{ title }</h1>
                    <p className="">{ children }</p>
                </div>
                <button className="p-2 flex flex-start focus:outline-none" onClick={this.dismissAlert}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M10,8l5.63-5.63a1.39,1.39,0,0,0-2-2L8,6,2.37.41a1.39,1.39,0,0,0-2,2L6,8,.41,13.63a1.39,1.39,0,1,0,2,2L8,10l5.63,5.63a1.39,1.39,0,0,0,2-2Z" />
                    </svg>
                </button>
            </div>
        );
    }
}

export default PopUpMessage;