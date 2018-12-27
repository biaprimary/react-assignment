import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeRadioTime = this.onChangeRadioTime.bind(this);
    this.onChangeRadioFreq = this.onChangeRadioFreq.bind(this);
    this.timeSlotInit =
      [
        { 'id': 'bb', 'content': 'Before Breakfast', checked: false },
        { 'id': 'ab', 'content': 'After Breakfast', checked: false },
        { 'id': 'bl', 'content': 'Before Lunch', checked: false },
        { 'id': 'al', 'content': 'After Lunch', checked: false },
        { 'id': 'bd', 'content': 'Before Dinner', checked: false },
        { 'id': 'ad', 'content': 'After Dinner', checked: false },
        { 'id': 'bs', 'content': 'Before Supper', checked: false },
        { 'id': 'as', 'content': 'After Supper', checked: false }
      ];

    this.state = {
      timeSlot: this.timeSlotInit,
      timeSlotValue: [],
      displayTimeSlot: [],
      freqValue: '',
      displayFreq: '',
      errors: [],
      displayErrors: [],
      day: 'day',
      displayDay: '',
      hideTimeSlotComponent: true,
      hideFrequencyComponent: true,
      radioChecked: false,
      radioTimeSlot: '',
      radioFrequency: '',
      showResult: false
    };
  }

  onSubmit(event) {
    event.preventDefault();
    let timeSlotValue = this.state.timeSlotValue;
    let freqValue = this.state.freqValue;
    let errors = this.state.errors;
    let isNumeric = /^-?\d*$/;

    if (!timeSlotValue.length) {
      errors.push('Select a time slot');
    }

    if (freqValue) {
      if (!isNumeric.test(freqValue)) {
        errors.push('Frequency Must be Number');
      } else if (parseInt(freqValue) === 0 ||
                 parseInt(freqValue) < 0 ) {
        errors.push('Frequency Must be greater than 0');
      }
    } else {
      errors.push('Frequency Can\'t empty');
    }

    if (!errors.length) {
      this.setState({
        displayTimeSlot: this.state.timeSlotValue,
        timeSlotValue: [],
        displayFreq: this.state.freqValue,
        freqValue: '',
        displayDay: this.state.day,
        day: 'day',
        hideTimeSlotComponent: true,
        hideFrequencyComponent: true,
        radioChecked: false,
        radioTimeSlot: '',
        radioFrequency: '',
        showResult: true
       });

      let timeSlot = this.state.timeSlot;
      timeSlot.forEach((element, index) => {
          timeSlot[index].checked = false;
      });
      this.setState({timeSlot});
    }

    this.setState({
      displayErrors: this.state.errors,
      errors: []
    })
  }

  onChangeTimeSlot(i, e) {

    let options = this.state.timeSlotValue;
    let timeSlot = this.state.timeSlot;
    let index;

    timeSlot[i].checked = !timeSlot[i].checked;

    if (e.target.checked) {
      options.push(e.target.value)
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1)
    }

    this.setState({timeSlot});
  }

  onChangeFreq(field, event) {
    this.setState({ freqValue: event.target.value });
  }

  onChangeDay(field, event) {
    this.setState({ day: event.target.value });
  }

  onChangeRadioTime(e) {
    this.setState({
      hideTimeSlotComponent: false,
      hideFrequencyComponent: true,
      radioTimeSlot: e.target.value,
      radioFrequency: ''
    });

    console.log(e.target.value);
  }

  onChangeRadioFreq(e) {
    this.setState({
      hideTimeSlotComponent: true,
      hideFrequencyComponent: false,
      radioTimeSlot: '',
      radioFrequency: e.target.value
    });

    console.log(e.target.value);
  }

  render() {
        const freqStyle = {
          textAlign: 'left',
          display: this.state.showResult ? 'block' : 'none'
        };

        const displayResult = {
          display: this.state.showResult ? 'block' : 'none',
          paddingLeft: 50
        }


        let time = this.state.displayTimeSlot.map((element, index) => {
          return (
            <li key={index}>{element}</li>
          );
        });

        let errors = this.state.displayErrors.map((element, index) => {
          return (
            <li key={index}>{element}</li>
          );
        });

        let timeSlotComponent = this.state.timeSlot.map((items, index) => {
          return (
            <label
              key={items.id}
              className="item-label">
              <input
                name={items.id}
                type="checkbox"
                value={items.content}
                checked={items.checked}
                onChange={this.onChangeTimeSlot.bind(this, index)}
              />
              <div className="item checkbox-value">
                  {items.content}
              </div>
            </label>
          )
        });

        return (
            <div className="App">
              <div className="flex-container">
                <div className="flex-header">
                  Select Patient Self-Monitoring Schedule *
                </div>
              </div>
              <div className="flex-container">
                <div className="flex-body">
                  <label>
                    <input
                      type="radio"
                      value="timeSlot"
                      name="radio-title"
                      checked={this.state.radioTimeSlot === 'timeSlot'}
                      onChange={this.onChangeRadioTime}
                    />
                    <div className="time-slot checked-radio">
                      By Time Slot
                    </div>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="frequency"
                      name="radio-title"
                      checked={this.state.radioFrequency === 'frequency'}
                      onChange={this.onChangeRadioFreq}
                    />
                    <div className="frequency checked-radio">
                      By Frequency
                    </div>
                  </label>
                </div>
              </div>

              <form onSubmit={this.onSubmit} ref="form">
                <div className="flex-container">

                  {
                    !this.state.hideTimeSlotComponent &&
                    <div className="flex-option">
                      {timeSlotComponent}
                    </div>
                  }
                  {
                    !this.state.hideFrequencyComponent &&
                    <div className="flex-option">
                      <input
                        type="number"
                        className="padding1"
                        name="freqValue"
                        value={this.state.freqValue}
                        onChange={this.onChangeFreq.bind(this, "freq")}
                      />
                      <div className="padding1">
                        times a
                      </div>
                      <select
                        className="padding1"
                        onChange={this.onChangeDay.bind(this, "onchangeday")}
                        >
                          <option value="day">Day(s)</option>
                          <option value="week">Week(s)</option>
                          <option value="month">Month(s)</option>
                        </select>
                      </div>
                    }
                    <div className="line-break"></div>
                    <div className="flex-footer">
                      <input
                        type="submit"
                        value="Save"
                      />
                    </div>
                  </div>
                </form>
                <br />

                <div
                  className="flex-container"

                >
                  <div className="flex-body"
                    style={displayResult}>
                    <ol>
                      {time}
                    </ol>
                  </div>
                  <div className="line-break"></div>
                  <div className="flex-body"
                    style={freqStyle}>
                    Freq : <br />
                    <b>{this.state.displayFreq}</b>
                    times a
                    {' '}
                    <b>{this.state.displayDay}(s)</b>
                  </div>
                </div>

                <div className="flex-container">
                  <div className="flex-body">
                    <ul>
                      {errors}
                    </ul>
                  </div>
                </div>
            </div>
        );
  }
}

export default App;
