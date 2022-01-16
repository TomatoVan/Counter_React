import React from "react";
import s from "./Counter.module.css";

type PropsType = {
	counter: number
	startValue:number
	maxValue:number
}

export const Counter:React.FC<PropsType> = ({counter,startValue,maxValue}) => {

	const counterClass = counter === maxValue ? s.counterMax : counter > startValue ? s.counterMid : s.counter

	return (
		<div className={counterClass}>{counter}</div>
	);
}