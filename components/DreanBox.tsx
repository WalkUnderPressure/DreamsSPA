import React, { Component } from 'react';
import { List, Map } from 'immutable';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaChevronUp, FaChevronDown, FaSnowflake, FaVolleyballBall } from 'react-icons/fa';
import { shortContent } from 'Helpers';

interface IDreanBoxProps {
    drean: Map<string, any>,
    owner: Map<string, any>,
}

interface IDreanBoxState {
    isFull: boolean;
}
class DreanBox extends Component<IDreanBoxProps, IDreanBoxState>{
    constructor(props: IDreanBoxProps) {
        super(props);
        this.state = {
            isFull: false,
        }
    }

    render() {
        const element = this.props.drean;
        const owner = this.props.owner;

        const isFull = this.state.isFull;
        const description = element && element.get("description");
        const shortDescription: string = element && shortContent(description, 4);
        const dateTime = element && new Date(element.get("dateOfEvent")).toLocaleDateString();
        
        // console.log('element - ', element);
        // console.log('owner - ', owner);

        let ownerFullName = '';
        let ownerEmail = '';
        if (owner) {
            ownerFullName = `${owner.get('firstName')}  ${owner.get('lastName')}`;
            ownerEmail = owner.get('email');
        } 

        return (
            <div className='my-4 bg-blue-300 rounded-lg'>
                <div className='px-6 pt-6 flex flex-row items-center'>
                    {/* <FaSnowflake className='text-2xl text-ocean-900 transform hover:rotate-90' /> */}
                    <FaVolleyballBall className='text-2xl text-blue-700 hover:text-3xl transform transition ease-in duration-1000 hover:rotate-180'/>
                    <h1 className='mx-2 text-3xl text-teal-600 hover:text-teal-900'>{ element && element.get('codeName') }</h1>
                </div>

                <div className='w-full border-solid border-white border' />
                
                <div className='px-6 py-6'>
                    <div>
                        <div className='flex flex-row items-center'>
                            <h1 className='text-black text-xl'>Description:</h1>
                            <div onClick={this.showDescription} className='mx-4'>
                                {isFull? <FaChevronUp /> : <FaChevronDown className='' />}
                            </div>
                        </div>
                        <p className='text-justify text-base font-thin'>{isFull && description }</p>
                    </div>
                    <div className='pt-4 flex flex-row justify-between items-center'>
                        <div className='flex flex-row items-center'>
                            <p className='font-medium text-base'>Date of Event:  </p>
                            <p className='mx-4 font-normal font-sm text-gray-700'>{dateTime}</p>
                        </div>
                        <div className='flex flex-row text-base'>
                            <p className='font-light text-gray-800'>{ownerFullName}</p>
                            <p className='mx-4 text-teal-600 hover:text-teal-900'>{ownerEmail}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    showDescription = () => {
        this.setState({
            isFull: !this.state.isFull,
        })
    }
}

export default DreanBox;