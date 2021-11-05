import React, { Component } from 'react';

const withRandom = (OGComponent) => {
    class WrapperComponent extends Component {
        constructor(props) {
            super(props);
            this.state={
                randomValue: 0, interval: null
            }
        }
        componentDidMount(){
            let interval = setInterval(this.setRandomValue, 1500)
            this.setState({interval: interval})
        }
        componentWillUnmount(){
            if(this.state.interval){
                clearInterval(this.state.interval);
                this.setState({interval: null})
            }
        }
        setRandomValue=()=>{
            console.log("After 1.5s...");
            let randomValue = Math.floor(Math.random()*100);
            this.setState({randomValue: randomValue});
        }
        render() {
            return (
                <div className="RandomCount">
                    This is wrapped!!
                    <OGComponent {...this.props} count={this.state.randomValue} />
                </div>
            )
        }
    }

    return WrapperComponent;

}

export default withRandom;