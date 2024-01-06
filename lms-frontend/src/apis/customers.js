import axios from 'axios'
import { BACKEND_URL } from './consts'

export async function getAllRetailers() {
    const response = await axios.get(`${BACKEND_URL}/api/retailers`)
    return response.data.retailers
}
export async function getAllEndCustomers() {
    const response = await axios.get(`${BACKEND_URL}/api/endcustomers`)
    return response.data.endcustomers
}
export async function getAllWholesalers() {
    const response = await axios.get(`${BACKEND_URL}/api/wholesalers`)
    return response.data.wholesalers
}
