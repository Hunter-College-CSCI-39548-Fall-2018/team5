import React from 'react';

// Specific Candidate Query

class SpecificCand extends React.Component {
    constructor(props){
        super(props)

        console.log(this.props.title)
    }

    render() {
        return (
            <div className="pollyform">
            <div className="title">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <input className="form-control" type="text"
                                    name="specific candidate"
                                    placeholder={"Specific Candidate"}
                            />
                        </div>
                        <div className="col">
                            <input className="form-control" type="text"
                                name="state"
                                placeholder={"State"}
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

export default SpecificCand;