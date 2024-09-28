
export const loadCustomerID = () => {
    try {
      const serializedState = localStorage.getItem('customerID');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
export const saveCustomerID = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('customerID', serializedState);
    } catch (err) {
      console.error("Could not save customerID", err);
    }
};


export const loadToken = () =>{
    try{
        const serializedState = localStorage.getItem('token');
        if (serializedState === null){
            return undefined
        }

        return JSON.stringify(serializedState)
    } catch(err){
        return undefined
    }

}

export const saveToken = (state) =>{
        try{
            const serializedState = JSON.stringify(state);
            localStorage.setItem('token', serializedState)
        } catch(err){
            console.error("Could not save token", err)
        }
};
