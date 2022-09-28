FROM maven:3.8.1-openjdk-17-slim as builder

COPY  pom.xml .

RUN mvn clean package -DskipTests

COPY . .

FROM openjdk:17-slim

COPY --from=builder .backend/target/hrms-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","target/hrms-0.0.1-SNAPSHOT.jar"]

RUN apt update && apt install nano curl -y 

EXPOSE 9001
