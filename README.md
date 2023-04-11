# HRMS
Application related to the HRMS
## Tech Stack
React
Spring Boot
Postgres
## Pre-req
Node JS.
Java 8
Postgres Server

## Build
### DB
> Create a Database eg: hrms
``` 
> sudo -u postgres createdb hrms;
> sudo -u postgres psql

### sudo systemctl start postgresql.service
```
### Backend
> Set the Environment Variables
```
export DB_HOST=localhost
export DB_PORT=5432
export DB=hrms
export DB_USER=postgres
export DB_PASSWORD=postgres
```
> Update the properties if requried in `src/main/java/resources/application.properties`
```
    server.port=9001
```
#### Build the Jar file
``` mvn package ```
#### Deploy the Jar
``` java -jar target/hrms-0.0.1-SNAPSHOT.jar ```
### Frontend
> update the environment properties in respective `.env` file
``` 
REACT_APP_API_ENDPOINT=http://20.20.4.30:9001
```
> Build the Node packages
```
npm install
```
> Run on the developer local
```
npm start
```
> This project is on Turkish Language. 
> Work around: Change the language by right click on the web page and translate to english.
> UPDATE: This is Converted to English.  If still found then use the above workaround.

# WARNING:
## DO NOT USE ZYMR EMAIL AND PASSWORD HERE
## INSTEAD USE TEMP EMAILs

## Expectations
1. Dockerfile, Docker-compose and deployment should be on Kubernetes
2. Use Sonarqube
3. Use Nginx