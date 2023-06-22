export const concatTimeAndUser = (time, user) => {
	if(!user && !time){
		return '-'
	}else if(!user){
		return time
	}else{
		return user
	}
}