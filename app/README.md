## Running with Docker


### Database
```bash
docker run --net host -it -d --name mongo mongo:latest 
```

### Backend
#### Setting up the environment
1. Go to the server folder
2. Create a `.env` file in `src/` folder with the following variables
```json
PORT=5000
GMAIL_USERNAME=<EMAIL_ADDRESS>
GMAIL_PASSWORD=<EMAIL_PASSWORD>
JWT_AC_KEY = a_very_secret_value
JWT_REF_KEY = another_very_secret_value
FRONTEND_URL = http://localhost:8008
DB=mongodb://localhost:27017/bucademy
SEMANTIC_SEARCH_SERVER_URL=<if default of semantic_search_server: http://localhost:9060>
```
#### Building and running 
```bash
cd server
docker build -t server:latest .
docker run --net host -it -d --name server server:latest
```
### Frontend
#### Setting up the environment
1. Go to the client folder
2. Update the `API_URL` variable in `next.config.json` file. In our case, set it to `http://localhost:5000`
#### Building and running 
```bash
docker build -t client:latest .
docker run --net host --name front client:latest
```
Go to localhost:8008 in your browser
