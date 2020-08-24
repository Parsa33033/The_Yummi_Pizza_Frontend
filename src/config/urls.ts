
const dns = "localhost"
const port = "8080"
const protocol = "http"

export const url = protocol + "://" + dns + ":" + port

const customerPath = "/api/customer/web"

export const registration_url = url + customerPath + "/register"
