#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package
RUN mvn -f /home/app/pom.xml compile
RUN mvn -f /home/app/pom.xml deploy

#
# Package stage
#
FROM amazoncorretto:21.0.4-alpine3.18
WORKDIR /app
COPY target/notification-service-1.0.0.jar app.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "app.jar"]