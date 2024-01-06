import axios from 'axios'
import { BACKEND_URL } from './consts'

export async function getAllRoutes() {
    const response = await axios.get(`${BACKEND_URL}/api/routes`)
    return response.data.routes
}

export function insertRoute() {
    return axios.get(`${BACKEND_URL}/api/routes`)
}

export function updateRoute() {
    return axios.get(`${BACKEND_URL}/api/routes`)
}

export function deleteRoute(routeId) {
    return axios.delete(`${BACKEND_URL}/api/routes`)
}
