// server local                                
// export const API_ENDPOINT_LOGIN = "http://192.168.1.111:8000/api/mathventure_login"
// export const API_ENDPOINT_REGISTER = "http://192.168.1.111:8000/api/mathventure_register"
// export const API_ENDPOINT_INCREMENT = "http://192.168.1.111:8000/api/mathventure_increment"

// server online
// export const API_ENDPOINT_LOGIN = "https://serverparatodo.ferter.es/api/mathventure_login"
// export const API_ENDPOINT_REGISTER = "https://serverparatodo.ferter.es/api/mathventure_register"
// export const API_ENDPOINT_INCREMENT = "https://serverparatodo.ferter.es/api/mathventure_increment"

const LOGIN = [
    "http://192.168.1.111:8000/api/mathventure_login",              // local [0]
    "https://serverparatodo.ferter.es/api/mathventure_login"        // global [1]
]
const REGISTER = [
    "http://192.168.1.111:8000/api/mathventure_register",           // local [0]
    "https://serverparatodo.ferter.es/api/mathventure_register"     // global [1]
]
const INCREMENT = [
    "http://192.168.1.111:8000/api/mathventure_increment",          // local [0]
    "https://serverparatodo.ferter.es/api/mathventure_increment"    // global [1]
]
const CLASSICRANK = [
    "http://192.168.1.111:8000/api/mathventure_classicranking",          // local [0]
    "https://serverparatodo.ferter.es/api/mathventure_classicranking"    // global [1]
]
const ANDROIDLOGIN = [
    "http://192.168.1.111:8000/api/mathventure_android_login",              // local [0]
    "https://serverparatodo.ferter.es/api/mathventure_android_login"        // global [1]
]
const ANDROIDREGISTER = [
    "http://192.168.1.111:8000/api/mathventure_android_register",              // local [0]
    "https://serverparatodo.ferter.es/api/mathventure_android_register"        // global [1]
]

const LOCAL_OR_GLOBAL = 1;

export const API_ENDPOINT_LOGIN = LOGIN[LOCAL_OR_GLOBAL]
export const API_ENDPOINT_REGISTER = REGISTER[LOCAL_OR_GLOBAL]
export const API_ENDPOINT_INCREMENT = INCREMENT[LOCAL_OR_GLOBAL]
export const API_ENDPOINT_CLASSICRANK = CLASSICRANK[LOCAL_OR_GLOBAL]
export const API_ENDPOINT_ANDROID_LOGIN = ANDROIDLOGIN[LOCAL_OR_GLOBAL]
export const API_ENDPOINT_ANDROID_REGISTER = ANDROIDREGISTER[LOCAL_OR_GLOBAL]