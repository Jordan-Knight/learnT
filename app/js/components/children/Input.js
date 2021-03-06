import React from 'react';
import helper from '../utils/helpers';

export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            title: '',
            body: '',
            link: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        var newState = {};

        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("click");
        var profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile);
        var userId = profile.sub.replace("auth0|", "");
        console.log(userId);

        var check = this.state.link;
       
        // add http:// if not present to make link work
        if (check.indexOf('http') !== 0) {
            check = 'http://' + check;
        }
        var post = {
            title: this.state.title,
            body: this.state.body,
            link: check,
            creator: userId
        }
        helper.savePost(userId, post).then(function (response) {
            this.props.getPosts();
        }.bind(this));
        this.props.setPost(this.state.title, this.state.body, this.state.link);
        //clear form after submit
        this.setState({ title: "", body: "", link: "" });
    }

    render() {
        return (
            <div className="row">
                <div className="panel z-depth-2">

                    <div className="panel-heading panel-primary">
                        <h3 className="panel-title">What did you learn today?</h3>
                    </div>

                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">

                                <h5>Headline</h5>
                                <input
                                    value={this.state.title}
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h5>Your Thoughts</h5>
                                <input
                                    value={this.state.body}
                                    type="text"
                                    className="form-control"
                                    id="body"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h5>Link your Source!</h5>
                                <input
                                    value={this.state.link}
                                    type="text"
                                    className="form-control"
                                    id="link"
                                    onChange={this.handleChange}
                                    required
                                />

                                <button className="btn-sm btn-success" type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}