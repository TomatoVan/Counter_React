type setIncrementType = ReturnType<typeof setIncrement>
type setResetType = ReturnType<typeof setReset>
type setSelectType = ReturnType<typeof setSelect>
type setMaxValueType = ReturnType<typeof setMaxValue>
type setStartValueType = ReturnType<typeof setStartValue>
type setStartValueToLocalStorageType = ReturnType<typeof setStartValueToLocalStorage>
type setMaxValueToLocalStorageType = ReturnType<typeof setMaxValueToLocalStorage>
type getStartValueFromLocalStorageType = ReturnType<typeof getStartValueFromLocalStorage>
type getMaxValueFromLocalStorageType = ReturnType<typeof getMaxValueFromLocalStorage>

type GeneralType = setIncrementType
	| setResetType
	| setSelectType
	| setMaxValueType
	| setStartValueType
	| setStartValueToLocalStorageType
	| setMaxValueToLocalStorageType
	| getStartValueFromLocalStorageType
	| getMaxValueFromLocalStorageType

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
				return {...state, counterNumber: state.startValue, establishedIncrement: state.maxValue, establishedReset:state.startValue}
			case "SET-START-VALUE":
				return {...state, startValue: action.payload.value}
			case "SET-MAX-VALUE":
				return {...state, maxValue: action.payload.value}
			case "GET-START-VALUE-FROM-LOCAL-STORAGE": {
				let startValueAsString = localStorage.getItem("startValue")
				if(startValueAsString) {
					return {...state,startValue: JSON.parse(startValueAsString)}
				}
				else return state
			}
			case "GET-MAX-VALUE-FROM-LOCAL-STORAGE": {
				let maxValueAsString = localStorage.getItem("maxValue")
				if(maxValueAsString) {
					return {...state,maxValue: JSON.parse(maxValueAsString)}
				}
				else return state
			}
			default: return state
		}
}

export const setIncrement = () => ({type:'SET-INCREMENT', payload:{}} as const)
export const setReset = () => ({type:'SET-RESET', payload:{}} as const)
export const setSelect = () => ({type:'SET-SELECT', payload:{}} as const)
export const setMaxValue = (value:number) => ({type:'SET-MAX-VALUE', payload:{value}} as const)
export const setStartValue = (value:number) => ({type:'SET-START-VALUE', payload:{value}} as const)
export const setStartValueToLocalStorage = () => ({type:'SET-START-VALUE-TO-LOCAL-STORAGE', payload:{}} as const)
export const setMaxValueToLocalStorage = () => ({type:'SET-MAX-VALUE-TO-LOCAL-STORAGE', payload:{}} as const)
export const getStartValueFromLocalStorage = () => ({type:'GET-START-VALUE-FROM-LOCAL-STORAGE', payload:{}} as const)
export const getMaxValueFromLocalStorage = () => ({type:'GET-MAX-VALUE-FROM-LOCAL-STORAGE', payload:{}} as const)
