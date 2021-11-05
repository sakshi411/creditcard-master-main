import React, { Component } from "react";
import './Card.css';
import Reactselect from "react-select";
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flipBack: false,
            name: '',
            numberOnCard: '#### #### #### ####',
            month: '',
            year: '',
            cvv: '',
            cardTypeUrl: "",


            typedNumber: "",
            typedNumberError: "",
            monthList: [{
                id: 1,
                label: 'Month',
                options: [
                    { label: "01", value: 1 }, { label: "02", value: 2 }, { label: "03", value: 3 },
                    { label: "04", value: 4 }, { label: "05", value: 5 }, { label: "06", value: 6 },
                    { label: "07", value: 7 }, { label: "08", value: 8 }, { label: "09", value: 9 },
                    { label: "10", value: 10 }, { label: "11", value: 11 }, { label: "12", value: 12 }]
            }],

            yearList: [{
                id: 1,
                label: 'Year',
                options: [
                    { label: "2021", value: 1 }, { label: "2022", value: 2 }, { label: "2023", value: 3 },
                    { label: "2024", value: 4 }, { label: "2025", value: 5 }, { label: "2026", value: 6 },
                    { label: "2027", value: 7 }, { label: "2028", value: 8 }, { label: "2029", value: 9 },
                    { label: "2030", value: 10 }]
            }]
        }
    }

    componentDidMount() {
        document.querySelector('.flip-card').addEventListener('mouseover', () => {
            // console.log("something");
            this.setState({ flipBack: true })
        })
        document.querySelector('.flip-card').addEventListener('mouseout', () => {
            this.setState({ flipBack: false });
            // console.log("something");
        })
    }
    //Name of Card Owner
    nameChange(n) {
        this.setState({
            name: n.target.value
        });
    }
    //Card Number
    numberChange(c) {
        let typedNumber = c.target.value.replaceAll(" ", "");

        var reg = /^[0-9]*[0-9]*$/;
        if (!reg.test(typedNumber)) {
            this.setState({
                typedNumberError: "Only numbers are allowed!"
            });
            return;
        }

        let typedNumberList = typedNumber.toString().split("");
        let numberOnCard = this.state.numberOnCard;
        let numberOnCardList = numberOnCard.split("");
        let cardTypeUrl = this.GetCardTypeImage(typedNumber);
        let length = typedNumber.length;


        if ((c.nativeEvent.inputType === "deleteContentBackward") || (length && length <= 16)) {

            if (c.nativeEvent.inputType === "deleteContentBackward") {
                numberOnCardList[typedNumberList.length + Math.floor(typedNumberList.length / 4)] = "#";
            } else {
                typedNumberList.map((item, index) => {
                    numberOnCardList[index + Math.floor(index / 4)] = item;

                })
            }


            let typedNumberFormatted = [];

            typedNumberList.map((item, index) => {
                if (!(index % 4)) {
                    typedNumberFormatted.push(" ");
                }
                typedNumberFormatted.push(item);

            })
            let typedNumber = typedNumberFormatted.join("");



            this.setState({
                typedNumber: typedNumber,
                cardTypeUrl: cardTypeUrl,
                numberOnCard: numberOnCardList.join(""),
                typedNumberError: ""
            });

        }
        else if (typedNumber.length > 16) {
            this.setState({
                typedNumberError: "max length reached!"
            });
        }


    }

    GetCardTypeImage(number) {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "visa.png";

        // Mastercard 
        // Updated for Mastercard 2017 BINs expansion
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
            return "mastercard.png";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "amex.png";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "discover.png";

        // Diners
        re = new RegExp("^3");
        if (number.match(re) != null)
            return "dinersclub.png";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "jcb.png";



        return "";
    }

    //Expiration
    monthChange(month) {
        this.setState({
            month: month
        });
    }
    yearChange(year) {
        this.setState({
            year: year
        });
    }
    //CCV 
    cvvChange(v) {
        if(v.target.value.length > 3){
            return;
        }
        this.setState({
            cvv: v.target.value
        });
    }


    render() {
        const { cardTypeUrl, numberOnCard, typedNumber, typedNumberError, name, monthList, yearList,
            flipBack, cvv, month, year
        } = this.state;

        let monthLabel = month.label != null ? month.label: "MM";
        let yearLabel = year.label != null ? year.label.slice(2): "YY";
        return (
            <div className="Card">

                <div className="card-form">
                    <div className={flipBack ? "flip-card hovered" : "flip-card"}>
                        <div className="card-container flip-card-inner">
                            
                            <div className="flip-card-front">
                                <img id="card-image" src={`images/16.jpeg`} alt="cardimage" width="450" />

                                <img id="card-chip" src={`images/chip.png`} alt="cardchip" />
                                {cardTypeUrl && <img id="card-type-image" src={`images/${cardTypeUrl}`} alt="cardtype" />}

                                <div id="card-number">{numberOnCard}</div>
                                <div className="holder-n-expires">
                                    <div id="card-holder">
                                        <label>Card Holders</label>
                                        <p>{name.length ? name : "FULL NAME"}</p>
                                    </div>
                                    <div id="card-expires">
                                        <label>Expires</label>
                                        <p>{monthLabel}/{yearLabel}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flip-card-back">
                                <img id="card-image" src={`images/16.jpeg`} alt="cardimage" width="450" />

                                <div className="holder-n-expires" >
                                </div>
                                <label className="card-cvv">CVV</label>
                                <div id="card-number">
                                    <div className="card-cvv-hidden">{"*".repeat(cvv.length)}</div>
                                </div>
                                {cardTypeUrl && <img id="card-type-image" src={`images/${cardTypeUrl}`} alt="cardtype" />}
                            </div>
                        </div>
                    </div>



                    <div className="form-field" style={{ paddingTop: "9em" }}>

                        <label>Card Number<span className="invalid-message">{typedNumberError}</span></label>
                        <input type="text" onChange={this.numberChange.bind(this)} value={typedNumber} />
                    </div>
                    <div className="form-field">
                        <label>Card Holders</label>
                        <input type="text" onChange={this.nameChange.bind(this)} value={name} />
                    </div>
                    <div className="form-field three-fields">
                        <div className="exp-date">
                            <label>Expiration Date</label>
                            <Reactselect
                                className="dropdown month"
                                menuPlacement="top"
                                options={monthList}
                                placeholder="Month"
                                onChange={this.monthChange.bind(this)}
                                value={month}
                            />
                        </div>
                        <div className="exp-date">
                            <label></label>
                            <Reactselect
                                className="dropdown year"
                                menuPlacement="top"
                                options={yearList}
                                placeholder="Year"
                                onChange={this.yearChange.bind(this)}
                                value={year}
                            />
                        </div>
                        <div className="form-field cvv">
                            <label style={{ display: "block" }}>CVV</label>
                            <input type="text"
                                value={cvv}
                                onChange={this.cvvChange.bind(this)}
                                onFocus={() => {
                                    this.setState({ flipBack: true })
                                    // const mouseoverEvent = new Event('mouseover');
                                    // document.querySelector('.flip-card').dispatchEvent(mouseoverEvent);
                                }}
                                onBlur={() => {
                                    this.setState({ flipBack: false })
                                    // const mouseoverEvent = new Event('mouseout');

                                    // document.querySelector('.flip-card').dispatchEvent(mouseoverEvent);
                                }}
                            />
                        </div>

                    </div>
                    <button className="submit">Submit</button>
                </div>
            </div>
        )
    }
}

export default Card;

