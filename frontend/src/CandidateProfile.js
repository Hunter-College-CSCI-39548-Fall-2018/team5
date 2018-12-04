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
            cand_loading: false,
            fec_loading: false,
            news_loading: false,
            cand_info: [],
            fec_info: []
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
        this.getFecInfo()
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
                    cand_info: data.candidate_information
                });
                console.log(this.state.cand_info.photo)
            },
            error:function(){
                console.log("Error.")
            }
        })
    }

    getFecInfo() {
        // /getFecInfo
        console.log("Requesting data from /getFecInfo");
        $.ajax({
            url : 'http://localhost:5000/getFecInfo',
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
                    fec_info: data.fec_candidate_info
                });
                console.log(this.state.fec_info)
            },
            error:function(){
                console.log("Error.")
            }
        })
    }
    render() {
        return (
            <div className="candyprofilewrapper shadow-sm p-3 mb-5 rounded" ref={this.MyRef}>
                <div className="row">
                    <div className="col-3 text-left">
                        <img src={this.state.cand_info.photo} className="rounded" alt=""></img>
                        <h3>{this.state.cand_info.preferredName} {this.state.cand_info.lastName}</h3>
                    </div>
                    <div className="col-6 text-center">
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
                    <div className="col-4">
                    <table class="table table-sm">
                        <tbody>
                            <tr>
                            <th scope="row">Title</th>
                            <td colspan="4">{this.state.cand_info.title}</td>
                            </tr>
                            <tr>
                            <th scope="row">Parties</th>
                            <td colspan="4">{this.state.cand_info.parties}</td>
                            </tr>
                            <tr>
                            <th scope="row">Birthdate</th>
                            <td colspan="4">{this.state.cand_info.birthDate}</td>
                            </tr>
                            <tr>
                            <th scope="row">Birthplace</th>
                            <td colspan="4">{this.state.cand_info.birthPlace}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default CandidateProfile;