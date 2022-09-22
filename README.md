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
```
### Backend

Update the Following properties in `src/main/java/resources/application.properties`
i.e: update the db details correctly
```
    server.port=9001
    spring.datasource.url=jdbc:postgresql://localhost:5432/hrms
    spring.datasource.username=postgres
    spring.datasource.password=abcd1234
```
#### Build the Jar file
``` mvn package ```
#### Deploy the Jar
``` java -jar target\hrms-0.0.1-SNAPSHOT.jar ```
### Frontend
Replace the Backend URL in backend services.
i.e: replace `localhost:8080` with the actual backend running service 

Build the Node packages
npm install

Run on the developer local
npm start

> This project is on Turkish Language. 
> Work around: Change the language by right click on the web page and translate to english.

# WARNING:
## DO NOT USE ZYMR EMAIL AND PASSWORD HERE
## INSTEAD USE TEMP EMAILs

## Expectations
1. Dockerfile, Docker-compose and deployment should be on Kubernetes
2. Use Sonarqube
3. Use Nginx