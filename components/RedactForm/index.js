import { Component } from "react";

class RedactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { ...props.data, ... state}
    }

    render() {
        const element = this.state;
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
        this.setState({
            [name]: value
        });
    };
}

export default RedactForm;