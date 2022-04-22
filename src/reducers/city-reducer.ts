const cityReducer = (state: any = null, action: any) => { 
    switch (action.type) {
        case 'CHANGE_CITY':
            return action.payload
    
        default:
            return state
    }
}

export default cityReducer