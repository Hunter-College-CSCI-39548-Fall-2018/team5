import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import './index.css';

class App extends React.Component {
    render() {
        let data = [
            {
                title: "Search by Address",
                content: "Handle address input."
            },
            {
                title: "Search Specific",
                content: "Handle specific candidate searches."
            },
            {
                title: "How to Vote",
                content: "Show links for voting information."
            }
        ];
        return (
            <PollyForm data={data} />
        );
    }
}

class PollyForm extends React.Component {
    componentWillMount() {
        let pollyform = [];
        
        this.props.data.forEach((i) => {
            pollyform.push({
                title: i.title,
                content: i.content,
                open: false
            });
        });

        this.setState({
            pollyContent: pollyform
        });
    }

    submit(i, title) {
        // Handle cases for three buttons:
        // by specific name
        // by address
        // third button displays links to voting info
        /*
        SWITCH HANDLES DIFFERENT SEARCH BARS
        Address,
        Specific,
        GENERAL INFO ( NOT AN ACTUAL SEARCH )
        switch(title) {
            case "Search by Address":
                console.log("Search by Address")
                break;
        }
        */
       console.log(title)
        let newForm = this.state.pollyContent.slice();
        let index = newForm.indexOf(i)
        $.ajax({
            url : 'http://localhost:5000/getCandidatesByOffice',
            type: 'GET',
            processData: false,
            contentType: false,
            cache: false,
            dataType: 'json',
            success:function(data){
                console.log(data)
                // this is not ideal
                console.log(data.positions_and_candidates[0][0][0])
                newForm[0].content = data.positions_and_candidates[0][0][0]
                newForm[index].open = !newForm[index].open;
            },
            error:function(){
                console.log("Error.")
            }
        })
        this.setState({pollyContent: newForm});
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

ReactDOM.render(<App />, document.getElementById('root'));
