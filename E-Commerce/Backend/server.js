import express from "express";
import colors from "colors";
import dotenv from "dotenv";

import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js';

 //configure env
 // it use to use variables present in .env file
 dotenv.config();

 //databse connection
 connectDB();

 const app = express();

 //middelwares

 // it help to stay safe from cors error
 app.use(cors());

 // it use so that we can use the json data sent by user from frontend through form
 app.use(express.json());

 // it use to show the console colorful
 app.use(morgan("dev"));


  //routes
 app.use("/api/v1/auth",     authRoutes    );
 app.use("/api/v1/category", categoryRoutes);
 app.use("/api/v1/product",  productRoutes );
 app.use("/api/v1/cart",     cartRoutes    );

  //PORT
 const PORT = process.env.PORT || 8080;

  //run listen
  app.listen(PORT, () => {
         // whenever we fetch variable from .env file we use prcess.env.VARIAblE_NAME
         console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white );
       });
    

      //...............................................................

   // to run the server we command=>  npm run server
   // to run server and frontend simultaneously we use => npm run dev

   // WHY WE USE .bgCyan.white
      //   In this code snippet, bgCyan and white are methods from the colors package in Node.js. They are used to modify the appearance of the console output in colorful manar.

      //   bgCyan sets the background color of the text to 'cyan' in the console .
      //   white sets the text color to white.
      //   These methods are chaining in the console.log() statement to apply both background color and text color to the output string that displays the server's status message.
  
      //.......................

// // to start
// 1) npm init
// 2) do some changes in package.json
       //    "scripts": {
       //   "start": "node server.js",
       //   "server": "nodemon server.js",
       //   "client": "npm start --prefix ./client",
       //   "dev": "concurrently \"npm run server\" \"npm run client\""
       // },
       // after update the package.json like above to run the server and frontend simultaneously
       // here first server start then our frontend start
       // and do start both simultaneously by npm run dev

       // ... "main": "server.js",
       // ... "type": "module",  (it help to run & import the files in the the es6 way)

// ...........................

// installed packages
       // 1) npm i nodemon
       // 2) npm i express
       // 3) npm i colors  (it use to make the console output colerful)
       // 4) npm i nodemon  (it run our code on watch mode)
       // 5) npm i dotenv

       // 6) npm i mongoose
       // 7) npm i morgan (it use to make the console output colerful)
       // 8) npm i bcrypt ( it use to conver the our password into hash)
       
       // 9) npm i jsonwebtoken ( it use to make our route more secure)
                 //imp // 10) npm i concurrently ( it use to run two file (i.e frontend and backend) simultaneously)
                 //imp // 11) npm i cors  ( it use to stay safe from cross origin error (i.e this error will come when we try to conect to different port))
      
       // 12) npm i slugify  ( if our url is look like /Project/Product/user/home) then slugify will convert our url to [ -Project-Product-user-home] ( i.e slugify will replace forward slash(/) to hyphen(-) or anything as we want )
       // 13) npm i express-formidable (it help to upload any file easily)
       // 14) 
       //......................


//CORS
   //        The app.use(cors()); line in an Express.js application is used to enable Cross-Origin 
   //        Resource Sharing (CORS). CORS is a security feature implemented by web browsers to restrict web
   //         pages from making requests to a different domain than the one that served the original web page. 
   //         This restriction is known as the same-origin policy.

   // When you have an Express.js server serving APIs and your frontend is hosted on a different domain, 
   // the browser's same-origin policy would prevent the frontend from making requests to 
   // the API. cors (Cross-Origin Resource Sharing) is a middleware that helps relax this policy by allowing 
   // servers to specify which origins are permitted to access their resources.

   // Here's a breakdown of the code:

   // app.use: As mentioned before, this is used to mount middleware in Express.

   // cors(): This is a middleware function provided by the cors package. When used without any configuration,
   //  it allows requests from any origin. You can also configure it to allow requests only from specific origins, 
   //  methods, headers, etc., based on your requirements.