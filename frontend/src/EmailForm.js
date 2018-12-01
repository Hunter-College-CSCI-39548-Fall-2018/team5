import React from 'react';

class EmailForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        });
        console.log(name, ":", event.target.value, this.state)
    }

    handleSubmit(event) {
        alert('submit!');
        event.preventDefault();
        this.submit()
    }

    submit(i) {
        console.log("Implement Yins email route")
    }

    render() {
        
        return (
            <div className="pollyform">
                <div className="email">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" type="text"
                            name="email"
                            placeholder={"Email Address"}
                            onChange={this.handleChange}
                            />
                        </div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

export default EmailForm;