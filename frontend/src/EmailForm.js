import React from 'react';
import $ from 'jquery'; 

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
        console.log("Attempting to sign up...");
        $.ajax({
            url : 'http://localhost:5000/signup',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                email: this.state.email
            },
            success:(data)=>{
                console.log("success")
            },
            error:function(){
                console.log("Error.")
            }
        })
    }

    render() {
        
        return (
            <div className="bottom">
                <div className="email">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" type="text"
                            name="email"
                            placeholder={"Sign up with your email for notifications!"}
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