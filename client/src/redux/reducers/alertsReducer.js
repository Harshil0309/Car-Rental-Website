const initialData ={
    laoding:false
};

export const alertsReducer=(state=initialData,action)=>{
    switch(action.type){
      case 'LOADING':{
        return{
            ...state,
            laoding:action.payload
        }
      }
      default : return state
    }
}