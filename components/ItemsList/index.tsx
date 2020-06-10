import React, { Component } from 'react';

interface IItemsListProps {
    itemsListHeader: string;
    items: Array<string>;
}
interface IItemsListState {
    items: Array<string>;
    isOpen: boolean;
}

class ItemsList extends Component<IItemsListProps, IItemsListState>{
    constructor(props: IItemsListProps) {
        super(props);
        this.state = {
            items: [],
            isOpen: true
        }
    }

    static getDerivedStateFromProps(props: IItemsListProps, state: IItemsListState) {
        return { ...props, ...props }
    }

    render() {
        const itemsArray = this.state.items;
        const emptyList = 'Empty List'; 
        let itemsList = null;
        if (itemsArray != null) {
            itemsList = this.state.items !== null && this.state.items.map(item => {
                return <li>{item}</li>
            });
        }else{
            itemsList = emptyList;
        }

        return (
            <div>
                <h3>{this.props.itemsListHeader}</h3>
                <ul>
                    {this.state.isOpen ? itemsList : emptyList}
                </ul>
                <button onClick={this.hideOpenHandler}>{this.state.isOpen ? 'Hide' : 'Open'}</button>
            </div>
        )
    }

    hideOpenHandler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default ItemsList;