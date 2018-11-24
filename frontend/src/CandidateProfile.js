import React from 'react';
import ReactDOM from 'react-dom'

// This class should take a candidate as prop from some method
// and display the candidates profile page
class CandidateProfile extends React.Component {
    constructor(props){
        super(props)

        //all the data streaming in as props
        console.log(this.props)
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    componentDidMount() {
        console.log("Component Mounted!")
        ReactDOM.findDOMNode(this).scrollIntoView({
            behavior: 'smooth',
        })
    }

    render() {
        
        return (
            <div className="candyprofilewrapper" ref={this.MyRef}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-left">
                            top left
                        </div>
                        <div className="col text-center">
                            <h2>{this.props.name}</h2>
                        </div>
                        <div className="col text-right">
                            top right
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateProfile;