
const dns = "104.248.254.44"
const port = "80"

// const dns = "localhost"
// const port = "8080"

const protocol = "http"

export const url = protocol + "://" + dns + ":" + port

const customerPath = "/api/customer/web"
const managerPath = "/api/manager/web"



export const registration_url = url + customerPath + "/register"
export const login_url = url + "/api/authenticate"
export const activatoin_url = url + "/api/activate"
export const password_reset_url = url + "/api/account/reset-password/finish"
export const password_reset_init_url = url + "/api/account/reset-password/init"

export const account_url = url + customerPath + "/account"


export const pizzaria_url = url + customerPath + "/pizzarias"
export const customer_message_url = url + customerPath + "/customer-message"
export const menu_item_list_url = url + customerPath + "/menu-items"
export const customer_url = url + customerPath + "/customers"
export const customer_order_url = url + customerPath + "/order"
export const customer_order_list_url = url + customerPath + "/orders"


export const manager_url = url + managerPath + "/managers"
export const order_url = url + managerPath + "/orders"
export const order_delivered_url = url + managerPath + "/order-delivered"
export const add_menu_item_url = url + managerPath + "/add-menu-item"
export const remove_menu_item_url = url + managerPath + "/remove-menu-item"