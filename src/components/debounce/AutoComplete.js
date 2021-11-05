import React, { Component } from 'react';
// import classnames from 'classnames';
// you should import `lodash` as a whole module
// import lodash from 'lodash';
import axios from 'axios';

// const ITEMS_API_URL = 'https://reqres.in/api/users?page=2';
const ITEMS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const DEBOUNCE_DELAY = 1500;

// the exported component can be either a function or a class


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [], isLoading: false
    }
    // this.debounceOnChange = this.debounce(this.fetchUsers, DEBOUNCE_DELAY);
  }

  debounce(func, wait) {
    let timeout;

    return function (...args) {

      const context = this;

      if (timeout) {
        clearTimeout(timeout);// when the user starts typing some more text, before 1.5s is over, clear old timer and force user to wait for fresh 1.5s after typing is done!
      }

      timeout = setTimeout(() => {
        timeout = null;
        // console.log("API called after "+wait/1000+"seconds!")
        func.apply(context, args);//func is called only after the wait period is completed once the user stops typing in the input field!!
      }, wait);

    };

  }

  fetchUsers = (event) => {
    this.setState({
      isLoading: true
    }, () => {
      axios.get(ITEMS_API_URL, {
        params: {
          q: event.target.value
        }
      })
        .then(response => {
          console.log(response.data);
          this.setState({
            itemsList: [...response.data],
            isLoading: false
          })
        })
        .catch(error => {
          this.setState({ isLoading: false })
        })
    })
  }

  render() {
    const { itemsList, isLoading } = this.state;
    return (
      <div className="wrapper">
        <div className="control">
          <input type="text"
            className={isLoading ? "input is-loading" : "input"}
            onChange={this.debounce(this.fetchUsers, DEBOUNCE_DELAY)}
            // onChange={this.debounceOnChange} 
            />
        </div>
        <div className="list is-hoverable">
          {itemsList.map(item => {
            return (
              <div><a href="#" className="list-item">{item.name}</a></div>
            )
          })}
        </div>
      </div>
    );
  }

}

export default Autocomplete;
