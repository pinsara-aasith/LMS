const BACKEND_URL = 'http://localhost:8000'
const BACKEND_URL2 = 'http://localhost:5000'

function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
}



export { BACKEND_URL, BACKEND_URL2, truncate }
