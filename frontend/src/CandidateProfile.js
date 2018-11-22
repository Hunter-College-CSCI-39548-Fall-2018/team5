import React from 'react';

// This class should take a candidate as prop from some method
// and display the candidates profile page
class CandidateProfile extends React.Component {
    constructor(props){
        super(props)

        console.log(this.props)
        console.log(this.props.cand_dat.name)
    }

    render() {
        
        return (
            <div>
                {this.props.cand_dat.name}
            </div>
        )
    }
}

export default CandidateProfile;