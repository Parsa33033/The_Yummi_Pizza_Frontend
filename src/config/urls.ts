
const dns = "localhost"
const port = "8080"
const protocol = "http"

export const url = protocol + "://" + dns + ":" + port

const customerPath = "/api/customer/web"



export const registration_url = url + customerPath + "/register"
export const login_url = url + "/api/authenticate"
export const activatoin_url = url + "/api/activate"
export const password_reset_url = url + "/api/account/reset-password/finish"
export const password_reset_init_url = url + "/api/account/reset-password/init"