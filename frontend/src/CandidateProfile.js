import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery'; 


// This class should take a candidate as prop from some method
// and display the candidates profile page
class CandidateProfile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            has_data: false,
            open: false,
            cand_profile: [],
            first_name: '',
            last_name: '',
            state: '',
        };
    
        //all the data streaming in as props
        console.log(this.props)
        this.goBack = this.goBack.bind(this);
    }


    submit(i) {
        let profile = 
        this.state.first_name +
        this.state.last_name +
        this.state.state        

        console.log(profile);
        $.ajax({
            url : 'http://localhost:5000/getCandidatesInfo',
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: {
                'profile': profile
            },
            success:(data)=>{
                console.log(data)
                /*
                for(var i=0; i<data.positions_and_candidates.length; i++){
                    console.log(
                        data.positions_and_candidates[i].name,
                        data.positions_and_candidates[i].office,
                        data.positions_and_candidates[i].party
                    )
                }*/
                // console.log(data.positions_and_candidates[0][0][0])
                // this.props.content = data.positions_and_candidates[0][0][0]
                // this.props.open = !this.props.open;
                this.props.data.open = !this.props.data.open;
                this.setState({
                    has_data: true,
                    cand_profile: data.profile_info
                });
            },
            error:function(){
                console.log("Error.")
            }
        })
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
        this.submit()
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
                            cand_profile[1]
                        </div>
                        <div className="col text-center">
                            <h2>{this.props.name}</h2>
                        </div>
                        <div className="col text-right">
                            cand_profile[9]
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CandidateProfile;
