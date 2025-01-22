# Product Hunt Clone/Mock
This project, another one for my portfolio, is a mock of the product hunt website (https://www.producthunt.com/), which I made for learning purposes.

# You can check the deploy link right here: https://ph-clone-two.vercel.app/

# Intro
Being a mock, it doesn't have all the features that the original website does, but it could be used as a 'products showroom' as well, since it has some of the key features that would allow this project to be functional and used in real-life if needed. The code was written in Typescript. The front-end and back-end were built separately;

# Key Features:
- The Homepage: It shows a list of the registered products one by one, ordering it by the upvotes (or likes) that it has received from the users (each user can only vote once in an unique product). Each product is shown in a 'card' with it's summarized descriptions, it's tags and the upvote button. When clicked a modal is displayed with the complete description of the product, as well as a link to the product's website. The homepage also has a side div where all tags are listed, so a person can click in an specific tag and go to a page with all of the products that contain that tag;
- The Dashboard page: The page where the logged in user can see all of the products he has registered in the website. He can also delete the product there. This page is only shown if the user is logged in;
- The New Product page: A page where the user can register a product. This page is only shown if the user is logged in;
- The about page: It's a simple page that explains the purpose of the application and the technologies used;
- The Sign In and Sign Up pages are managed by Clerk;

# Technologies and libraries used:
  # Front-end:
  - **React**: a JavaScript-based UI development library;
  - **Next.js**: a React framework that enables, amongst other thing, server-side and static rendering, and facilitates the application's routing;
  - **Axios**: a promise based HTTP client for the browser and node.js;
  - **Tailwind CSS**: an utility-first CSS framework for rapidly building modern websites;
  - **Clerk**: an authentication and user manager that handles most of the authentication process, including registration, login, logout and the user's profile. It also allows the developer to use it's webhooks if he wants to receive event notifications,such when a user is created or updated, which is great to store and manage user's infos in the local back-end and/or database;
  - **Dotenv:** a zero-dependency module that loads environment variables from a .env file into process.env;

  # Back-end:
  - **Node.Js:** a JavaScript runtime built on Chrome's V8 JavaScript engine;
  - **Express:** a fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for web and mobile applications;
  - **MongoDB:** a source-available, cross-platform, document-oriented database program (NoSQL);
  - **MongoDB Atlas:** an integrated suite of data services centered around a cloud database designed to accelerate and simplify building with data (necessary for database connection in the project deployment);
  - **Cors:** a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options;
  - **Nodemon:** a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected;
  - **Clerk Middleware**: The clerk middleware allows the developer to integrate Clerk authentication into the Express application (It checks the request's cookies and headers for a session JWT and, if found, attaches the Auth object to the request object under the auth key);
  - **Open AI API**: In this project I used the open AI API to create a simple and not required feature: summarize the product's description when a new product is registered so I could show that summarized description in the product's card. Note that using this API is not required since it is not free to use and it doesn't really affect the app's functionality. I just used to learn how to apply it on a project and to make it more interesting;

# How to run the application:
After cloning the repository and installing de dependencies with `cd ./ph-clone && npm install` and `cd ./ph-clone/backendAPI && npm install` (having node and npm already installed is required);

- To run the front-end: `npm run dev`
- To run the back-end: `npm run start`

 - **Note**: It is important to host the API on a proper site (I used render: https://render.com/) so the clerk webhook works properly;

# Thanks for your time. Feedbacks are always appreciated!

