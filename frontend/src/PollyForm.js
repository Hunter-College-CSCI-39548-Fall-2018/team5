import React from 'react';
import $ from 'jquery'; 

// Form used for ADDRESS and SPECIFIC CANDIDATE querying

class PollyForm extends React.Component {
    constructor(props){
        super(props)
        let pollyform = [];

        this.props.data.forEach((i) => {
            pollyform.push({
                title: i.title,
                content: i.content,
                open: false
            });
        });

        this.state = {pollyContent: pollyform};
    }

    submit(i, title) {
        /*
        Handle cases for three buttons:
        by specific name
        by address
        third button displays links to voting info
        
        SWITCH HANDLES DIFFERENT SEARCH BARS
        Address,
        Specific,
        */
        switch(title) {
            case "Search by Address":
                console.log("Search by Address")
                $.ajax({
                    url : 'http://localhost:5000/getCandidatesByOffice',
                    type: 'GET',
                    processData: false,
                    contentType: false,
                    cache: false,
                    dataType: 'json',
                    success:(data)=>{
                        let newForm = this.state.pollyContent.slice();
                        let index = newForm.indexOf(i)
                        console.log(data)
                        // console.log(data.positions_and_candidates[0][0][0])
                        newForm[0].content = data.positions_and_candidates[0][0][0]
                        newForm[index].open = !newForm[index].open;
                        this.setState({pollyContent: newForm});
                    },
                    error:function(){
                        console.log("Error.")
                    }
                })
                break;
            case "Search Specific":
                // Needs implementing!
                console.log("Search Specific")
                let newForm = this.state.pollyContent.slice();
                let index = newForm.indexOf(i)
                newForm[index].open = !newForm[index].open;
                this.setState({pollyContent: newForm});
                break;
            default:
                console.warn("Error in title")
        }
    }

    render() {
        const sections = this.state.pollyContent.map((i) => (
            <div key={this.state.pollyContent.indexOf(i)}>
                <div className="title">
                    <div className="arrow-wrapper">
                        <i className={i.open ? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
                    </div>
                    <span className="title-text">
                        <input className="form-control" type="text" placeholder={i.title} 
                        onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                this.submit(i, i.title)
                            }
                        }}>
                        </input>
                    </span>
                </div>
                <div className={i.open ? "content content-open" : "content"}>
                    <div className={i.open ? "content-text content-text-open" : "content-text"}>
                        {i.content}
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="pollyform">
            {sections}
            </div>
        )
    }
}

export default PollyForm;