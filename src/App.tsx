import React, {useEffect} from 'react';
import './App.css';
import s from "./Components/App.module.css";
import {Counter} from "./Components/Counter/Counter";
import {Buttons} from "./Components/Buttons/Buttons";
import {Selector} from "./Components/Selector/Selector";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./bll/store";
import {
	getMaxValueFromLocalStorageTC,
	getStartValueFromLocalStorageTC, setEstablishedIncrementTC,
	setEstablishedResetTC,
	setIncrement,
	setMaxValue,
	setReset,
	setSelect,
	setStartValue
} from "./bll/counterReducer";

function App() {

	const dispatch = useDispatch()

	let counterNumber = useSelector<AppRootState, number>(state => state.counter.counterNumber)
	let startValue = useSelector<AppRootState, number>(state => state.counter.startValue)
	let maxValue = useSelector<AppRootState, number>(state => state.counter.maxValue)
	let establishedIncrement = useSelector<AppRootState, number>(state => state.counter.establishedIncrement)
	let establishedReset = useSelector<AppRootState, number>(state => state.counter.establishedReset)

	const increment = () => dispatch(setIncrement())
	const reset = () => dispatch(setReset())

	const select = () => {
		dispatch(setSelect())
		dispatch(setEstablishedResetTC(startValue))
		dispatch(setEstablishedIncrementTC(maxValue))
	}

	const maxValueHandler = (value:number) => dispatch(setMaxValue(value))

	const startValueHandler = (value:number) => dispatch(setStartValue(value))

	useEffect(() => {
		dispatch(getStartValueFromLocalStorageTC())
		dispatch(getMaxValueFromLocalStorageTC())
	}, [dispatch])

	let setValues = establishedIncrement === maxValue && establishedReset === startValue
	let errorValues = maxValue < 0 || startValue < 0 || maxValue === startValue || maxValue < startValue
	let disableSetButton = setValues || errorValues
	let disableIncrementBtn = counterNumber === establishedIncrement
	let disableResetBtn = counterNumber === establishedReset

	return (
		<div className={s.wrapper}>
			<div className={s.selector}>
				<div className={s.selTitle}>Selector</div>
				<Selector maxValue={maxValue} startValue={startValue}  maxValueHandler={maxValueHandler} startValueHandler={startValueHandler}/>
				<Buttons  title={"Set"}  callback={select} disable={disableSetButton}/>
			</div>
			<div className={s.status}>
				{setValues
					?
					<div className={s.counter}>
						<div className={s.CountTitle}>Counter</div>
						<Counter counter={counterNumber} maxValue={maxValue} startValue={startValue} />
						<div>
							<Buttons  title={"Increment"}  callback={increment} disable={disableIncrementBtn}/>
							<Buttons  title={"Reset"}  callback={reset} disable={disableResetBtn}/>
						</div>
					</div>
					: errorValues
						?
						<div className={s.error}>Incorrect value!</div>
						:
						<div className={s.description}>enter values and press 'set'</div>
				}
			</div>
		</div>
	)
}

export default App;
