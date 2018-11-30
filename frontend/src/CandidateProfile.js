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
                    cand_info: data
                });
                console.log(this.state.cand_info.candidate_information.photo)
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
                        <div className="col text-left">
                            <img src={this.state.cand_info.photo} className="img-fluid" alt="MAKE PHOTOS LOAD"></img>
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