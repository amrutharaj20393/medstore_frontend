import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register content-type application-json
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)

}

export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

export const GoogleloginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/Google-login`, reqBody)
}
//user---------------------------------------------------------------------------------------
export const GetAllMedicineHomeApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-medcines-home`)
}

export const GetAllMedicineApi = async (searchKey, reqHeader) => {

    //query parameterbaseurl?key=value
    return await commonApi('GET', `${serverUrl}/get-all-medicines?search=${searchKey}`, '', reqHeader)
}

export const GetCartMedicineApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/get-cartmedicine`,'',reqHeader)
}
export const GetAMedicineApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/get-amedicine/${id}`)
}
//add to cart api
export const addToCartAMedicineApi = async (reqBody,reqHeader) => {

    //query parameterbaseurl?key=value
    return await commonApi('PUT', `${serverUrl}/cart`, reqBody,reqHeader)
}
//empty to cart api
export const emptyToCartAMedicineApi = async (reqHeader) => {

    //query parameterbaseurl?key=value
    return await commonApi('PUT', `${serverUrl}/emptycart`, reqHeader)
}

//api to make payment
export const makePaymentApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/make-payment`, reqBody, reqHeader)
}

//oredr api
export const GetOrderMedicineApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/get-ordermedicine`,'',reqHeader)
}
//admin--------------------------------------------------------------------------------------
//allOrderList for admin
export const GetOrderMedicineAdminApi = async () => {
    return await commonApi('GET', `${serverUrl}/get-ordermedicineadmin`)
}
//add medicine 

export const addMedicineApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-medicne-admin`, reqBody, reqHeader)
}

//get all book
export const GetAllMedicineAdminApi = async (reqHeader) => {

    //query parameterbaseurl?key=value
    return await commonApi('GET', `${serverUrl}/get-all-medicines-admin`, '', reqHeader)
}
//edit a medicine
export const editAMedicineAdminApi = async (reqBody) => {

    //query parameterbaseurl?key=value
    return await commonApi('PUT', `${serverUrl}/edit-medicine`, reqBody)
}

//delete a medicine
export const deleteAMedicineAdminApi = async (id) => {

    return await commonApi('DELETE', `${serverUrl}/delete-medicine/${id}`)
}

//get all users
export const GetAllUsersAdminApi = async (reqHeader) => {

    //query parameterbaseurl?key=value
    return await commonApi('GET', `${serverUrl}/get-all-userdet-admin`, '', reqHeader)
}