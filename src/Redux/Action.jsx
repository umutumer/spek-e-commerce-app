import axios from "axios"
import { setProduct } from "./ProductSlice"



const getProduct = () => async (dispatch) =>{
    try{
        const response = await axios.get('http://localhost:3005/product')
        dispatch(setProduct(response.data));
    }catch(error){
        console.error('Veri gelirken hata oluştu:',error);
    }
}
export { getProduct };