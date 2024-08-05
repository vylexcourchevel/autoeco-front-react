//store  importe les slieces
import {configureStore} from "@reduxjs/toolkit"
import sliceCar from "./reducers/sliceCar"
import sliceAuth from "./reducers/sliceAuth"



/*
Configure permet de créer le store plus simplement contrairement 
aux versions prrécedentes de redux 

Cette methode erecoit un objet en parametre avec une propriété 
réducer qui utilise automatiquemlent combineReducer

La fonction se connecte automatiquement au DevTools
*/
// dans configuration du store je met jles slices
export default configureStore({
    reducer:{ 
        car : sliceCar,
        auth : sliceAuth

   
    }
})