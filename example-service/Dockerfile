FROM java:8-jre
MAINTAINER Alexander Lukyanchikov <sqshq@sqshq.com>

ADD ./target/example-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/example-service.jar"]

EXPOSE 6000
