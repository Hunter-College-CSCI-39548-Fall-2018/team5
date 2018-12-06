import React from 'react';
import CandidateProfile from './CandidateProfile';


// Specific Candidate Query

class SpecificCand extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            has_data: false,
            open: true,
            child: false,
            cand_data: [],
            name: '',
            state: '',
        };

        this.handler = this.handler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handler() {
        this.setState({
            open: true,
            child: false
        })
        console.log("ddd", this.state.open)
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
        this.setState({
            has_data: true,
            child: true,
            open: false,
        });
        console.log(this.state.name, this.state.state)
    }

    render() {
        if (this.state.open === true) {
            return (
                <div className="pollyform">
                <div className="title">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" type="text"
                                    name="name"
                                    placeholder={"Specific Candidate"}
                                    onChange={this.handleChange}
                            />
                        </div>
                        <div className="col">
                            <input className="form-control" type="text"
                                name="state"
                                placeholder={"State"}
                                onChange={this.handleChange}
                            />
                        </div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                </div>
                <div className={this.state.has_data ? "content content-open" : "content"}>
                    <div className={this.state.has_data ? "content-text content-text-open" : "content-text"}>
                        {this.state.has_data ? this.renderCandidate() : "noData"}
                    </div>
                </div>
                </div>
            )
        } else {
            return (
                <div className={this.state.has_data ? "spcandwrapper" : "content"}>
                    {this.state.has_data ? this.renderCandidate() : "noData"}
                </div>
            )
        }
    }

    renderCandidate() {
        if (this.state.child === true) {
            return(
                    <CandidateProfile name={this.state.name} state={this.state.state} action={this.handler} />
            )
        }
    }
}

export default SpecificCand;