# The_Yummi_Pizza_Frontend
The frontend website for the yummy pizza project for Innoscripta

The backend and admin panel link: https://github.com/Parsa33033/The_Yummi_Pizza_Backend 

Admin panel link: http://104.248.254.44/
Website link: http://161.35.28.65/

## Tech Used

1) React framework using Typescript programming language
2) Redux for state management
3) i18next for locale
4) Bootstrap framework
5) Docker for deployment
6) Nginx for deployment

## How to Deploy

1) You can change the ip (dns) port number from config in  ```./src/config/urls.ts```
2) Set the url of the The Yummi Pizza Backend (which is also the url of the admin panel)
3) Run `npm install`
3) For development use `npm start` and test the app
4) For deployment:
    1. Create a build with `npm run build`
    2. Copy `docker-compose.yml` and `Dockerfile` from the project folder into the build folder created in the last step
5) Send the build folder on the server
6) Install Docker and Docker compose on your server
7) Run `docker-compose up` command in the build folder
8) Now the Nginx is hosting the react app build but you still need to configure Nginx to support routing of react in the docker container, so:
    1. run `docker exec -it <container_name> sh` (container name can be found by using the command `docker container ls`)
    2. now you are in the docker container which contains Nginx config file
    3. go to `etc/nginx/conf.d` and add the line `etc/nginx/conf.d` in the location section in `default.conf`
        ```$xslt
        location / {
          //
          try_files $uri /index.html;
          //
        }
        ``` 
    4. remember to restart the container with 
        1. `docker container stop <container_name>`
        2. `docker container start <container_name>`
    
note: remember that all the command must be executed in the project directory 

## How to Work with

You can do couple of things in this app:

customer:

1) A customer can register and after registration an activation email would be sent to her/his email where she/he can click on the link given to activate the account
2) A logged in customer (or not a registered customer) can add to cart and proceed to checkout (**you can switch between Dollor and Euro prices with a button in both main page and cart page**)
3) By creating an order after checkout the order would be added to order list in customer menu on the top right of the page (if the customer or manager is logged in there will be a menu on the top right of the page or header) and then
an email of successful order would be sent to the customer
4) Customer can check her/his orders in the order menu on the top right of the page (if customer is logged in). the delivered ordered and not delivered orders can be seen which actually the switch between the two is handled by the manager
5) Customer can logout
6) A customer can edit her/his profile so that next time she/he does not need to fill in the info needed in the checkout page. 

manager:

1) If you want to become a manager you have to register in the admin panel but you would not get an activation email because the admin has to activate you herself
2) If you can login as the manager your menu panel consists of pages of orders and menus
    1. In the order menu you can see all the orders and you can check the checkbox for each order to confirm that the food has been delivered. by doing so, customer can see that her/his order has been delivered in the order page
    2. In the menu (menu items edit) section of the app menu you can add or deduct menu items which in turn shows in the main page of the website (so menus get added dynamically by manager or admin from admin panel)
3) A manger can edit her/his profile

    
note: admin panel is https://github.com/Parsa33033/The_Yummi_Pizza_Backend

    
Admin credentials:
1) username: admin
2) password: admin

Already activated manager credentials:
1) username: manager@manager.com
2) password: manger

## Pros
no pros for the frontend

## Cons
1) due to lack of time, there is no usage of container components
2) due to lack of time, not all the words are translated through i18next
3) no ssl has been used
