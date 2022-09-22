#Taking the base image to work on
FROM openjdk:8-jdk

#installation and updation 
RUN apt-get update && apt-get install -y maven

#copying code from project to dockerfile
COPY . .

#to build the project we used maven : which is (Project Management tool)
RUN mvn clean package -DskipTests

#To run the jar
CMD ["java","-jar","target/hrms-0.0.1-SNAPSHOT.jar"]

#port
EXPOSE 9001
