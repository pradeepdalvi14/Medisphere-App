import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const mon = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
      const slotDateFormat = (slotDate)=>{
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + mon[Number(dateArray[1])] + " " + dateArray[2];
    }

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear()-birthDate.getFullYear();
        return age;
    }
  const Currency = "$";

    const value = {
        calculateAge,slotDateFormat,Currency
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;