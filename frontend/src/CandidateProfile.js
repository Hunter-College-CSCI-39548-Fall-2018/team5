import React from 'react';

// This class should take a candidate as prop from some method
// and display the candidates profile page
class CandidateProfile extends React.Component {
    constructor(props){
        super(props)

        console.log(this)

        this.state = {opened: this.props.opened};
    }

    render() {
        
        return (
            <div className="candyprofilewrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-left">
                            top left
                        </div>
                        <div className="col text-center">
                            <h1>Candidate Profile</h1>
                        </div>
                        <div className="col text-right">
                            <h1>X</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateProfile;