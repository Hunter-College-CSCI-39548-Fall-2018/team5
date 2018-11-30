import React from 'react';
import CandidateProfile from './CandidateProfile';


// Specific Candidate Query

class SpecificCand extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            has_data: false,
            cand_data: [],
            name: '',
            state: '',
        };

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
        this.setState({
            has_data: true,
        });

        console.log(this.state.name, this.state.state)
    }

    render() {
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
    }

    renderCandidate() {
        return(
            <div className="candwrapper">
                <CandidateProfile name={this.state.name} state={this.state.state} />
                <h1>aaa</h1>
            </div>
        )
    }
}

export default SpecificCand;