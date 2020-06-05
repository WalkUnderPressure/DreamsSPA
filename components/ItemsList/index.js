import React, { Component } from 'react';

class ItemsList extends Component{
    constructor(props){
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