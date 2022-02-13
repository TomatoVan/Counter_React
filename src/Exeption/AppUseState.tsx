import React, {useEffect, useState} from 'react';
import './App.css';
import s from "./Components/App.module.css";
import {Counter} from "../Components/Counter/Counter";
import {Buttons} from "../Components/Buttons/Buttons";
import {Selector} from "../Components/Selector/Selector";

function App() {

	const [maxValue, setMaxValue] = useState<number>(5);
	const [startValue, setStartValue] = useState<number>(0);
	const [counter, setCounter] = useState<number>(0);

	const [disableI, setDisableI] = useState<number>(0);
	const [disableR, setDisableR] = useState<number>(0);


	let setValues = disableI === maxValue && disableR === startValue
	let errorValues = maxValue < 0 || startValue < 0 || maxValue === startValue || maxValue < startValue
	let disableSet = setValues || errorValues

	const increment = () => {
		setCounter(counter + 1)
	}

	const reset = () => {
		setCounter(startValue)
	}

	const select = () => {
		setCounter(startValue)
		setDisableI(maxValue)
		setDisableR(startValue)

		localStorage.setItem("maxValue", JSON.stringify(maxValue))
		localStorage.setItem("startValue", JSON.stringify(startValue))

	}

	const maxValueHandler = (value:number) => {
		setMaxValue(value)

	}

	const startValueHandler = (value:number) => {
		setStartValue(value)

	}

	useEffect(() => {
		let maxValueAsString = localStorage.getItem("maxValue")
		if(maxValueAsString) {
			setMaxValue(JSON.parse(maxValueAsString))
			console.log(JSON.parse(maxValueAsString))
		}

		let startValueAsString = localStorage.getItem("startValue")
		if(startValueAsString) {
			setStartValue(JSON.parse(startValueAsString))
			console.log(JSON.parse(startValueAsString))
		}
	}, [])

	return (
		<div className={s.wrapper}>
			<div className={s.selector}>
				<div className={s.selTitle}>Selector</div>
				<Selector maxValue={maxValue} startValue={startValue}  maxValueHandler={maxValueHandler} startValueHandler={startValueHandler}/>
				<Buttons  title={"Set"}  callback={select} disable={disableSet}/>
			</div>
			<div className={s.status}>
				{setValues
					?
					<div className={s.counter}>
						<div className={s.CountTitle}>Counter</div>
						<Counter counter={counter} maxValue={maxValue} startValue={startValue} />
						<div>
							<Buttons  title={"Increment"}  callback={increment} disable={counter === disableI}/>
							<Buttons  title={"Reset"}  callback={reset} disable={counter === disableR}/>
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
