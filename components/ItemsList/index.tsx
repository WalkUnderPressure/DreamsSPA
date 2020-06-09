import React, { Component } from 'react';

interface IItemsListProps{
    itemsListHeader : string;
}
interface Item{
    id : string;
    value : string;
}
interface IItemsListState{
    items : Array<Item>;
    isOpen : boolean;
}

class ItemsList extends Component<IItemsListProps,IItemsListState>{
    constructor(props : IItemsListProps){
        super(props);
        this.state = {
            items : [],
            isOpen : false
        }
    }
    
    render(){
        let itemsList = null;
        if(!this.state.isOpen){
            itemsList = [];
        }else{
            itemsList = this.state.items.map(item => <li key={item.id}>{item.value}</li>)
        }
        return (
            <div>
                {this.props.itemsListHeader}
                <ul>
                    {itemsList}
                </ul>
            </div>
        )
    }
}

export default ItemsList;