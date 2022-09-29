FROM maven:3.8.1-openjdk-17-slim as builder

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:17-slim

COPY --from=builder target/hrms-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","target/hrms-0.0.1-SNAPSHOT.jar"]

EXPOSE 9001
