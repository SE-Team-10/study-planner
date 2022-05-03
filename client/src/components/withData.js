import React, {Component} from "react";

const withData = (WrappedComponent) => {
    class FetchData extends Component {
        state = {
            data: null,
        };

        componentDidMount() {
            this.callBackendAPI()
                .then((res) => this.setState({ data: res }))
                .catch((err) => console.log(err));
        }

        // fetching the GET route from the Express server which matches the GET route from server.js
        callBackendAPI = async () => {
            const response = await fetch("/api");
            const body = await response.json();

            if (response.status !== 200) {
                throw Error(body.message);
            }
            return body;
        };
        render() {
            return (
                <WrappedComponent fileData={this.state.data}/>
            );
        }
    }
    return FetchData
}

export default withData;
