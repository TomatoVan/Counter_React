import React, {ChangeEvent} from "react";
import s from "./Selector.module.css";

type PropsType = {
	maxValue:number
	startValue:number
	maxValueHandler:(value:number) => void
	startValueHandler:(value:number) => void
}

export const Selector:React.FC<PropsType> = ({maxValue, startValue, maxValueHandler, startValueHandler}) => {



	const maxValueCallback = (e:ChangeEvent<HTMLInputElement>) => {
		maxValueHandler(Number(e.currentTarget.value))
	}

	const startValueCallback = (e:ChangeEvent<HTMLInputElement>) => {
		startValueHandler(Number(e.currentTarget.value))
	}

	let maxValueClass
	let startValueClass

	if (maxValue < 0 || maxValue === startValue || maxValue < startValue) {
		maxValueClass = s.error
	} else {
		maxValueClass = s.normal
	}
	if (startValue < 0 || startValue === maxValue || maxValue < startValue) {
		startValueClass = s.error
	} else {
		startValueClass = s.normal
	}


	return (
		<div className={s.wrapper}>
			<div>
				<text className={s.title}>maxValue</text>
				<input value={maxValue}  className={maxValueClass} onChange={maxValueCallback} name="maxValue" type="number" />
			</div>
			<div>
				<text className={s.title}>startValue</text>
				<input value={startValue} className={startValueClass} onChange={startValueCallback} name="startValue" type="number" />
			</div>
		</div>
	);
}