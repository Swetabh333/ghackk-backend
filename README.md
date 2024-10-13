# Backend

This is the backend task for Software Development Engineering (Web) internship task for Ghackk.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/Swetabh333/ghackk-backend.git
cd ghackk-backend
```
Inside the repository create a .env file.
Put the following inside the env file.

```
MONGODB_URI=<your_mongofb_connection_string>/<your_database_name>
JWT_SECRET=<your_jwt_secret>
FRONTEND_URL=<your_frontend_url>

```
If you're cloning and running the frontend for this [project](https://github.com/Swetabh333/ghackk-frontend) from my repository it should be `http://localhost:3001`

once you're done

run the following : 
```bash
npm install
npm start
```

Your server should be up and runnning.