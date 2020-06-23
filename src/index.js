// Slomux — упрощённая, сломанная реализация Flux.
// Перед вами небольшое приложение, написанное на React + Slomux.
// Это нерабочий секундомер с настройкой интервала обновления.

// Исправьте ошибки и потенциально проблемный код, почините приложение и прокомментируйте своё решение.

// При нажатии на "старт" должен запускаться секундомер и через заданный интервал времени увеличивать свое значение на значение интервала
// При нажатии на "стоп" секундомер должен останавливаться и сбрасывать свое значение
// actions

import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from "redux";
import {connect, Provider} from "react-redux";



const CHANGE_INTERVAL = 'CHANGE_INTERVAL';

// action creators
const changeInterval = value => ({
    type: CHANGE_INTERVAL,
    payload: value,
});

let initialState = {
    currentInterval: 1,
};
// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_INTERVAL:

            return {...state, currentInterval: state.currentInterval + action.payload};

        default:
            return state
    }
};

let reducers = combineReducers({
    interval: reducer,
});
const store = createStore(reducers);


// components
class IntervalComponent extends React.PureComponent {
    render() {
        return (
            <div>
              <span>Интервал обновления секундомера: {this.props.currentInterval} сек.</span>
              <span>
          <button onClick={() => this.props.changeInterval(-1)}>-</button>
          <button onClick={() => this.props.changeInterval(1)}>+</button>
        </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentInterval: state.interval.currentInterval,
});

const IntervalContainer = connect(mapStateToProps, {changeInterval})(IntervalComponent);

class TimerComponent extends React.PureComponent {
    state = {
        currentTime: 0
    };
    timerInterval = '';

    handleStart() {
        this.timerInterval = setInterval(() => this.setState({
            currentTime: this.state.currentTime + this.props.currentInterval,
        }), this.props.currentInterval * 1000);
    }

    handleStop() {
        this.setState({currentTime: 0});
        clearInterval(this.timerInterval);
    }

    render() {
        return (
            <div>
              <IntervalContainer/>
              <div>
                Секундомер: {this.state.currentTime} сек.
              </div>
              <div>
                <button onClick={this.handleStart.bind(this)}>Старт</button>
                <button onClick={this.handleStop.bind(this)}>Стоп</button>
              </div>
            </div>
        )
    }
}

const TimerContainer = connect(mapStateToProps, {})(TimerComponent);

ReactDOM.render(
    <Provider store={store}>
      <TimerContainer/>
    </Provider>,
    document.getElementById('root')
);
