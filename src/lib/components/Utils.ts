
export const rangeMap = (percentage, rMax, rMin)=>{
	return percentage*(rMax-rMin) + rMin
}

export const rangeMap2 = (val, smin, smax, emin, emax) => (emax-emin)*(val-smin)/(smax-smin) + emin