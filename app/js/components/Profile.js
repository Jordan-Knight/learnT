// Import dependencies
import React from "react";
import helper from "./utils/helpers";
import Dropzone from "./DropzoneComponent";
import { Link } from "react-router";
import moment from 'moment';
import auth from '../../../auth/initAuth';


// Creates and exports the Profile component
export default class Profile extends React.Component {

    // Initial state setup
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [],
            photoUrl: "./assets/images/silhouette.png"
        }

    }

    componentDidMount() {

        if (auth.loggedIn()) {

            var profile = JSON.parse(localStorage.getItem('profile'));
            var userId = profile.sub.replace("auth0|", "");

            helper.getUser(userId).then(function (response) {
                console.log(response);
                console.log('got a user');
                this.setState({ user: response.data });
                this.setState({ posts: response.data.posts });

            }.bind(this));

        }
    }

    updateUser(user) {
        helper.updateUser(this.state.user._id, user).then(function (response) {
            console.log(response);
            console.log('updated a user');
            this.setState({ user: response.data });
            this.setState({ posts: response.data.posts })
            console.log(this.state.user);
        }.bind(this))
    }

    renderProfile(){
        return(
            <div>
                <div className="row">
                    <div className="col m6 s12 center-align">
                        <div className="row profilePic">
                            <img className="responsive-img" src={this.state.photoUrl} />
                            <Dropzone user={this.state.user} id="widget-upload" />
                        </div>

                    </div>
                    <div className="col m6 s12">
                        <div className="card-panel">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className="panel z-depth-3 content">

                    <div className="panel-heading center">
                        <h3 className="panel-title">Things I've Learned</h3>
                    </div>
                    <div className="panel-body">

                        <ul>
                            {
                                this.state.posts.map((post, idx) => {

                                    return (
                                        <div className="row">
                                            <div className="panel z-depth-2">
                                                <li key={idx}>

                                                    <Link to={post.link} target="_blank" className="linkOut">
                                                        <div className="panel-heading panel-primary">
                                                            TIL: {post.title}
                                                        </div>
                                                    </Link>
                                                    <div className="panel-body">
                                                        <div className="row">
                                                            <div className="col s10">
                                                                <p> {post.body} </p>
                                                            </div>
                                                            <div className="col s1 right-align">
                                                                <p><i className="material-icons">thumb_up</i>{post.upVote.length}</p></div>
                                                            <div className="col s1 left-align">
                                                                <p><i className="material-icons">thumb_down</i>{post.downVote.length}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row right-align">
                                                            <i>Posted {moment(post.date).format('ll')}</i>
                                                        </div>
                                                    </div>
                                                </li>

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    renderTemplate(){
        return(
            <div>
            <div className="row">
                {this.props.children}
            </div>
            <div className="panel z-depth-3 content">

                <div className="panel-heading center">
                    <h3 className="panel-title">Things I've Learned</h3>
                </div>
                <div className="panel-body">
                    <Link to="/login">Log in to view your account</Link>
                </div>
            </div>
        </div>
        )
    }

    render() {
        const style = {
            visibility: 'hidden',
            position: 'absolute',
            top: '0px', left: '0px', height: '0px', width: '0px'
        }

        return (
            <div>
               { auth.loggedIn() ? this.renderProfile() : this.renderTemplate() }
            </div >
        )
    }

}


