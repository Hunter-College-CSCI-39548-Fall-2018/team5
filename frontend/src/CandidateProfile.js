import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery'; 

// This class should take a candidate as prop from some method
// and display the candidates profile page
class CandidateProfile extends React.Component {
    constructor(props){
        super(props)

        //all the data streaming in as props
        console.log(this.props)
        this.goBack = this.goBack.bind(this);
        this.state = {
            has_data: true,
            got_cand_info: false,
            cand_info: []
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    componentDidMount() {
        console.log("Component Mounted!")
        ReactDOM.findDOMNode(this).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
        this.getCandInfo()
    }

    getCandInfo() {    
        console.log("Requesting data from /getCandidatesInfo");
        $.ajax({
            url : 'http://localhost:5000/getCandidatesInfo',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                name: this.props.name,
                state: this.props.state
            },
            success:(data)=>{
                console.log(data)
                this.setState({
                    got_cand_info: true,
                    cand_info: data.candidate_information
                });
                console.log(this.state.cand_info.photo)
            },
            error:function(){
                console.log("Error.")
            }
        })
    }
    render() {
        return (
            <div className="candyprofilewrapper" ref={this.MyRef}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 text-left">
                    </div>
                    <div className="col-6 text-center">
                    <img src={this.state.cand_info.photo} className="rounded" alt=""></img>
                        <h3>{this.state.cand_info.preferredName} {this.state.cand_info.lastName} </h3>
                        <h4>{this.state.cand_info.parties}</h4>
                    </div>
                    <div className="col-3 text-right">
                    {this.props.action &&
                    <button type="button" className="close" aria-label="Close" onClick={this.props.action}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    }
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                    <p>
                        {this.state.cand_info.birthDate}
                    </p>
                    <p>
                        {this.state.cand_info.birthPlace}
                    </p>
                    </div>
                    <div className="col-6">
                    <p>
                        {this.state.cand_info.title}
                    </p>
                    </div>
                </div>
            </div>
            </div>
        )
    }

}

export default CandidateProfile;