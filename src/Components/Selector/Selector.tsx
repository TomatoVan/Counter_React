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
	let maxValueError = maxValue < 0 || maxValue === startValue || maxValue < startValue
	let startValueError = startValue < 0 || startValue === maxValue || maxValue < startValue

	maxValueError ? maxValueClass = s.error : maxValueClass = s.normal
	startValueError ? startValueClass = s.error : startValueClass = s.normal

	return (
		<div className={s.wrapper}>
			<div>
				<span className={s.title}>maxValue</span>
				<input value={maxValue}  className={maxValueClass} onChange={maxValueCallback} name="maxValue" type="number" />
			</div>
			<div>
				<span className={s.title}>startValue</span>
				<input value={startValue} className={startValueClass} onChange={startValueCallback} name="startValue" type="number" />
			</div>
		</div>
	);
}