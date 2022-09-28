
FROM openjdk:8-jdk

RUN apt-get update && apt-get install -y maven

COPY . .

RUN mvn clean package -DskipTests

ENTRYPOINT ["java","-jar","target/hrms-0.0.1-SNAPSHOT.jar"]

EXPOSE 9001
