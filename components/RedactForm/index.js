import { Component } from "react";

class RedactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('CWRP props', nextProps.data);
        console.log('CWRP state', state);
    }

    static getDerivedStateFromProps(props, state) {
        console.log('DSFP')
        console.log('incoming props : ',props);
        // Re-run the filter whenever the list array or filter text change.
        // Note we need to store prevPropsList and prevFilterText to detect changes.
        if (
            props.data != state
        ) {
            return { ... props.data };
        }else{
            return null;
        }
      }

    render() {
        const element = this.state;
        console.log('element : ', element);
        return (
            <form onSubmit={this.handleOnSubmit}>
                <h1> ID : {element && element.id}</h1>
                <input type="hidden" name="id" value={element && element.id} />
                <input type="text" name="codeName" value={element && element.codeName} onChange={this.handleInputChange} />
                <input type="text" name="description" value={element && element.description} onChange={this.handleInputChange} />
                <input type="text" name="date" value={element && element.date} onChange={this.handleInputChange} />

                <button type="submit">Save</button>
            </form>
        )
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log('change ', value);
        this.setState({
            [name]: value
        });
    };
}

export default RedactForm;