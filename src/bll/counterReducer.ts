import {Dispatch} from "redux";

type setIncrementType = ReturnType<typeof setIncrement>
type setResetType = ReturnType<typeof setReset>
type setSelectType = ReturnType<typeof setSelect>
type setMaxValueType = ReturnType<typeof setMaxValue>
type setStartValueType = ReturnType<typeof setStartValue>
type setEstablishedResetACType = ReturnType<typeof setEstablishedResetAC>
type setEstablishedIncrementACType = ReturnType<typeof setEstablishedIncrementAC>
type getStartValueFromLocalStorageACType = ReturnType<typeof getStartValueFromLocalStorageAC>
type getMaxValueFromLocalStorageACType = ReturnType<typeof getMaxValueFromLocalStorageAC>

type GeneralType = setIncrementType
	| setResetType
	| setSelectType
	| setMaxValueType
	| setStartValueType
	| setEstablishedResetACType
	| setEstablishedIncrementACType
	| getStartValueFromLocalStorageACType
	| getMaxValueFromLocalStorageACType

export type stateType = {
	maxValue:number,
	startValue:number,
	counterNumber:number,
	establishedIncrement:number,
	establishedReset:number
}

let initialType:stateType = {
	maxValue: 5,
	startValue: 0,
	counterNumber: 0,
	establishedIncrement: 0,
	establishedReset: 0
}

export const counterReducer = (state:stateType = initialType, action: GeneralType):stateType => {
		switch (action.type) {
			case "SET-INCREMENT":
				return {...state, counterNumber: state.counterNumber + 1}
			case "SET-RESET":
				return {...state, counterNumber: state.startValue}
			case "SET-SELECT":
				return {...state, counterNumber: state.startValue, establishedReset: state.startValue, establishedIncrement: state.maxValue}
			case "SET-START-VALUE":
				return {...state, startValue: action.payload.value}
			case "SET-MAX-VALUE":
				return {...state, maxValue: action.payload.value}

			case "SET-ESTABLISHED-RESET" :
				return {...state, establishedReset: action.payload.startValue }
			case "SET-ESTABLISHED-INCREMENT" :
				return {...state, establishedIncrement: action.payload.maxValue }

			case "GET-START-VALUE-FROM-LOCAL-STORAGE":
				return {...state,startValue: action.payload.newValue}
			case "GET-MAX-VALUE-FROM-LOCAL-STORAGE":
				return {...state,maxValue: action.payload.newValue}
			default: return state
		}
}

//AC

export const setIncrement = () => ({type:'SET-INCREMENT', payload:{}} as const)
export const setReset = () => ({type:'SET-RESET', payload:{}} as const)
export const setSelect = () => ({type:'SET-SELECT', payload:{}} as const)
export const setMaxValue = (value:number) => ({type:'SET-MAX-VALUE', payload:{value}} as const)
export const setStartValue = (value:number) => ({type:'SET-START-VALUE', payload:{value}} as const)

export const setEstablishedResetAC = (startValue:number) => ({type:'SET-ESTABLISHED-RESET', payload:{startValue}} as const)
export const setEstablishedIncrementAC = (maxValue:number) => ({type:'SET-ESTABLISHED-INCREMENT', payload:{maxValue}} as const)

export const getStartValueFromLocalStorageAC = (newValue:number) => ({type:'GET-START-VALUE-FROM-LOCAL-STORAGE', payload:{newValue}} as const)
export const getMaxValueFromLocalStorageAC = (newValue:number) => ({type:'GET-MAX-VALUE-FROM-LOCAL-STORAGE', payload:{newValue}} as const)


//THUNK

export const setEstablishedResetTC = (startValue:number) => (dispatch: Dispatch) => {
	localStorage.setItem("startValue", JSON.stringify(startValue))
	dispatch(setEstablishedResetAC(startValue))
}

export const setEstablishedIncrementTC = (maxValue:number) => (dispatch: Dispatch) => {
	localStorage.setItem("maxValue", JSON.stringify(maxValue))
	dispatch(setEstablishedIncrementAC(maxValue))
}

export const getStartValueFromLocalStorageTC = () => (dispatch: Dispatch) => {
	let startValueAsString = localStorage.getItem("startValue")
	if(startValueAsString) {
		let newValue =  JSON.parse(startValueAsString)
		dispatch(getStartValueFromLocalStorageAC(newValue))
	}
}

export const getMaxValueFromLocalStorageTC = () => (dispatch: Dispatch) => {
	let maxValueAsString = localStorage.getItem("maxValue")
	if(maxValueAsString) {
		let newValue =  JSON.parse(maxValueAsString)
		dispatch(getMaxValueFromLocalStorageAC(newValue))
	}
}
