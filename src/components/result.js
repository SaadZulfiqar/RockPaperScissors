import React, { Component } from "react";
import PropTypes from 'prop-types';

class Result extends Component {
    static propTypes = {
        message: PropTypes.string
    }
    render() {
        const { message } = this.props;
        return (
            <div className="result"><span dangerouslySetInnerHTML={{ __html: message }} /></div>
        );
    }
}

export default Result;
