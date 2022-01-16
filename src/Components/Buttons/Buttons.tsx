import React from "react";
import s from "./Buttons.module.css";

type PropsType = {
	callback:() => void
	disable?:boolean
	title:string

}

export const Buttons:React.FC<PropsType> = ({callback, disable,title }) => {

	return (
		<button className= {s[title]} onClick={callback} disabled={disable}  >{title}</button>
	);
}