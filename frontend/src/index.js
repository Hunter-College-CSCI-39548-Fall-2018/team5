import React from 'react';
import ReactDOM from 'react-dom';
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

    submit(i) {
        console.log()
        const newForm = this.state.pollyContent.slice();
        const index = newForm.indexOf(i)
        
        newForm[index].open = !newForm[index].open;
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
                        <input class="form-control" type="text" placeholder={i.title} 
                        onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                this.submit(i)
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
