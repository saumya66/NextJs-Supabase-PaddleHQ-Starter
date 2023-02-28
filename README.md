<img src="https://leap.club/assets/images/common/hero/leap-club-logo.jpeg"  width="100px" height="100px" align="left"/><br/>
 
# Backend Monorepo

This is a lerna powered monorepo that is intended to hold together the backend servers used by the client-side apps of Leap.Club.

## 👉 Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) if not already installed.
- Git - [Download & Install Git](https://git-scm.com/downloads) if not already installed.

## 👉 Setting Up

- Clone the repository:
    ```
    git clone https://github.com/leap-club/lc-backend.git
    ```
- Install dependencies:
    ```
    cd lc-backend
    npm install
    ```
- Build the project:
    ```
    npm run build
    ```
    
 ## 👉 Structure of the Monorepo:
 Here's a very high level overview of some important parts of our monorepo to help you get the gist of how things work : <br/>
 ```
 ├──lc-backend
     ├──packages
     |  ├──main-app
     |  ├──dashboard-app
     └──package.json   
 ```
 The `lc-backend` is our root folder. And the folder- `packages` contains multiple express backend servers/packages we use. For ex- `main-app` & `dashboard-app`.
 
The `main-app` serves as the backend server to our mobile and web app. 

 Such a monorepo is possible due to Lerna. To know more about it do take a look at it's [documentation](https://lerna.js.org/docs/introduction).
 
  ## 👉 Adding environment configurations:
  To add the environment configurations to any of the backend servers follow these steps. In this example let's consider our `main-app` server :
  - Please reach out to the appropriate person in team to get the environment configurations.
  - Create a new file named `.env` in `lc-backend\packages\main-app`.
  - Copy-Paste the received configurations into the `.env` file.
  
  And we are done setting up the project! ✅
  
  ## 👉 Running the servers:
  Let's say you want to run the `main-app`, here's how to do it :
  - Open the command line and stay at the root level i.e `lc-backend/`
  - To run the server in staging : 
     ```
     npm run main-app:staging
     ```
   - To run the server in production (make sure to change environment configuration from staging to production): 
     ```
     npm run main-app:prod
     ```
   
#### After this the server must be listening on PORT: 8000 ! 🚀

To test if it's working in staging, hit this endpoint : `http://localhost:8000/v1/status`

You should get back an object like below as response with Code - 200 ✅: 
```
{
    "status": "ok",
    "processEnv": "development",
    "CURRENT_PROJECT": "MAIN_APP_STAGING_LOCAL",
    "commitSubject": "comment out git action",
    "commitHash": "673b457e5f357dc76e0cf6530fdca8842b6a679d"
}
```
