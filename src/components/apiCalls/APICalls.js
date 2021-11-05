import React, { Component } from 'react';
import axios from 'axios';
let timeout;
let cancelSource;
class APICalls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [], loading: false
        }
    }
    componentDidMount() {
        // this.fetchItems();
        cancelSource = axios.CancelToken.source();
        // let cancelToken = cancel.token;
        document.addEventListener('abort', () => {
            console.log('cancel event')
            cancelSource = null;

        })
    }
    fetchItems() {
        this.setState({ loading: true }, async () => {
            axios({
                method: 'get',
                url: 'https://fortnite-api.theapinetwork.com/items/list',
                cancelToken: cancelSource.token || ''
            }).then(items => {
                this.setState({
                    itemList: items.data.data.slice(0, 30),
                    loading: false
                })
            }).catch(error => {
                console.log(error);
                if (axios.isCancel(error)) {
                    console.log('request cancelled!');
                    cancelSource = axios.CancelToken.source();
                }
                this.setState({
                    loading: false
                })
            });

        })
    }

    debounce(func, delay) {
        return function (...args) {
            let context = this;
            if (timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args);
                console.log("API called after " + delay / 1000 + "s debounce!")
            }, delay);
        }
    }
    cancelAPICall() {
        // if(cancel){
        cancelSource = axios.CancelToken.source();
        cancelSource.cancel();
        // }
    }
    clearItems() {
        this.setState({ itemList: [] })
        cancelSource = axios.CancelToken.source();
    }


    render() {
        const { itemList, loading } = this.state;
        return (
            <div className="APICalls">
                <h3>This is APICalls page</h3>
                <button onClick={this.debounce(this.fetchItems.bind(this), 1500)}>Debounce Item Request</button>
                <button onClick={this.cancelAPICall.bind(this)}>Cancel Item Request</button>
                <button onClick={this.clearItems.bind(this)}>Clear Items</button>
                {
                    itemList.map(obj => (
                        <div key={obj.itemId}>{obj.item.name}</div>
                    ))
                }
                {loading && <div><progress>loading...</progress></div>}

            </div>
        )
    }
}

export default APICalls;