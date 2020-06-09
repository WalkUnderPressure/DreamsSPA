import { Component } from "react";
import Item from '../../Templates/Item';

interface IRedactFormProps{
    onSubmit : Function;
    data : Item;
}
interface IRedactFormState{
    data : Item;
}

class RedactForm extends Component<IRedactFormProps,IRedactFormState> {
    constructor(props : IRedactFormProps) {
        super(props);
        this.state = {
            data : this.props.data
        }
    }

    static getDerivedStateFromProps(props : IRedactFormProps, state : IRedactFormState) {        
        return { ...props, ...props}
    }

    render() {
        const element = this.state.data;
        return (
            <form onSubmit={this.handleOnSubmit}>
                <input type="hidden" name="id" value={element && element.id} />
                <input type="text" name="codeName" value={element && element.codeName} onChange={this.handleInputChange} />
                <input type="text" name="description" value={element && element.description} onChange={this.handleInputChange} />
                <input type="text" name="dateOfEvent" value={element && (element.dateOfEvent == null ? '' : String(element.dateOfEvent))} onChange={this.handleInputChange} />

                <button type="submit">{element != null && element.id!='add' ? "Save" : "Add"}</button>
            </form>
        )
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.data);
    }

    handleInputChange = (event) => {
        const value : string = event.target.value;
        const name : string = event.target.name;
        
        this.state.data[name] = value;
        this.setState({data : this.state.data});
    };
}

export default RedactForm;