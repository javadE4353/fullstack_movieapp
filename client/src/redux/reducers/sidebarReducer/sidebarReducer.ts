import {CLOSESIDEBAR,OPENSIDEBAR} from "../../types/types";

import {Action} from "../../action/actionSidebar"


interface State{
 toggle:boolean;
}


const initialState={
    toggle:false
}




const sidebarToggle=(state:State=initialState,action:Action)=>{


    switch (action.type) {
        case CLOSESIDEBAR:
             return(
                {...state,toggle:false}
                )
            break;
    
        case OPENSIDEBAR:
             return(
                {...state,toggle:true}
             )
            break;
    
        default:
            return state
            break;
    }

}

export default  sidebarToggle;