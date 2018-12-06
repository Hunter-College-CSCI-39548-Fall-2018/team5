import React from 'react';
import $ from 'jquery'; 

class EmailForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: "",
            zip: ""
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
        event.preventDefault();
        this.submit()
    }

    submit(i) {
        console.log("Attempting to sign up...");
        $.ajax({
            url : '/signup',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                email: this.state.email,
                zip: this.state.zip
            },
            success:(data)=>{
                console.log("success")
            },
            error:function(){
                console.log("Error.")
                //alert('Whoops something went wrong!');
            }
        })
    }

    render() {
        
        return (
            <div className="container-fluid bottom">
            <div className="row">
            <div className="col">
                <h3>Sign up with your email for notifications on upcoming elections!</h3>
                <div className="email">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" type="text"
                            name="email"
                            placeholder={"Email"}
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                        <div className="col">
                            <input className="form-control" type="text"
                            name="zip"
                            placeholder={"Zip Code"}
                            onChange={this.handleChange}
                            required
                            />
                        </div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                </div>
            </div>
            </div>
            </div>
        )
    }
}

export default EmailForm;
