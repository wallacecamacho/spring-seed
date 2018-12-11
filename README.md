
# Spring-Seed

**Uma aplicação de referência**


Esta é uma aplicação de prova de conceito, que demonstra o [Padrão de Arquitetura de Microserviços](http://martinfowler.com/microservices/) usando Spring Boot, Spring Cloud e Docker. Com uma interface simples em angular 7.

## Functional services

Springseed tem um simples exemplo de serviço. Serviço independente utilizando um banco de dados mongo para um serviço específico.

<img alt="Functional services" src="https://user-images.githubusercontent.com/1315080/49801704-08a4a480-fd32-11e8-92a3-1a5bcbac6493.png">

## Infraestrutura

##### Disponibilizando serviços
Utilizando Spring Boot application com `spring-cloud-starter-config` dependência

Apenas forneça `bootstrap.yml` com o nome da aplicação e com a url do Config service:
```yml
spring:
  application:
    name: example-service
  cloud:
    config:
      uri: http://config:8888
      fail-fast: true
```

### API Gateway

É o ponto de entrada único no sistema, usado para manipular solicitações roteando-as para o serviço de back-end apropriado ou chamando vários serviços de back-end (http://techblog.netflix.com/2013/01/optimizing-netflix-api.html). Além disso, ele pode ser usado para autenticação, teste de estresse, migração de serviço, manipulação de resposta estática, gerenciamento de tráfego ativo.
Netflix opensourced [exemplo de abordagem](http://techblog.netflix.com/2013/06/announcing-zuul-edge-service-in-cloud.html), e com Spring Cloud pode ser habilitado com uma anotação `@EnableZuulProxy`. No projeto, usei Zuul para armazendar conteúdo stático com o build do angular 7 (ui application) e rotear as requisições para os apropriados serviços. Exemplo de configuração de roteamento:

```yml
zuul:
  routes:
    notification-service:
        path: /contas/**
        serviceId: example-service
        stripPrefix: false

```

Todas as configurações que começam com `/contas` será roteada para o determinado serviço. Zuul usa o serviço de descoberta [Service discovery](https://github.com/sqshq/PiggyMetrics/blob/master/README.md#service-discovery) para localizar a intância definida.

### Service discovery (Serviço de descoberta)

Com Spring Boot, conseguimos de forma fácil usar o Eureka `spring-cloud-starter-eureka-server` como dependência, e a anotação`@EnableEurekaServer` e uma simples configuração.

Client support enabled with `@EnableDiscoveryClient` annotation an `bootstrap.yml` with application name:
``` yml
spring:
  application:
    name: notification-service
```

Eureka fornece uma interface simples, onde você pode rastrear serviços em execução e várias instâncias disponíveis: `http://localhost:8761`

### Load balancer, Circuit breaker e Http client

Netflix OSS provides another great set of tools. 

#### Ribbon
Ribbon is a client side load balancer which gives you a lot of control over the behaviour of HTTP and TCP clients. Compared to a traditional load balancer, there is no need in additional hop for every over-the-wire invocation - you can contact desired service directly.

Out of the box, it natively integrates with Spring Cloud and Service Discovery. [Eureka Client](https://github.com/sqshq/PiggyMetrics#service-discovery) provides a dynamic list of available servers so Ribbon could balance between them.

#### Hystrix
Hystrix is the implementation of [Circuit Breaker pattern](http://martinfowler.com/bliki/CircuitBreaker.html), which gives a control over latency and failure from dependencies accessed over the network. The main idea is to stop cascading failures in a distributed environment with a large number of microservices. That helps to fail fast and recover as soon as possible - important aspects of fault-tolerant systems that self-heal.

Besides circuit breaker control, with Hystrix you can add a fallback method that will be called to obtain a default value in case the main command fails.

Moreover, Hystrix generates metrics on execution outcomes and latency for each command, that we can use to [monitor system behavior](https://github.com/sqshq/PiggyMetrics#monitor-dashboard).

#### Feign
Feign is a declarative Http client, which seamlessly integrates with Ribbon and Hystrix. Actually, with one `spring-cloud-starter-feign` dependency and `@EnableFeignClients` annotation you have a full set of Load balancer, Circuit breaker and Http client with sensible ready-to-go default configuration.

Here is an example from Account Service:

``` java
@FeignClient(name = "statistics-service")
public interface StatisticsServiceClient {

	@RequestMapping(method = RequestMethod.PUT, value = "/statistics/{accountName}", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	void updateStatistics(@PathVariable("accountName") String accountName, Account account);

}
```

- Everything you need is just an interface
- You can share `@RequestMapping` part between Spring MVC controller and Feign methods
- Above example specifies just desired service id - `statistics-service`, thanks to autodiscovery through Eureka (but obviously you can access any resource with a specific url)


### Distributed tracing

A análise de problemas em sistemas distribuídos pode ser difícil, por exemplo, solicitações de rastreamento que se propagam de um microsserviço para outro.

[Spring Cloud Sleuth](https://cloud.spring.io/spring-cloud-sleuth/) resolve esse problema fornecendo suporte para rastreamento distribuído. Ele adiciona dois tipos de ID ao logging: traceId e spanId.
Os logs seguem o seguinte padrão `[appname,traceId,spanId,exportable]` do Slf4J MDC:

```text
2018-07-26 23:13:49.381  WARN [gateway,3216d0de1384bb4f,3216d0de1384bb4f,false] 2999 --- [nio-4000-exec-1] o.s.c.n.z.f.r.s.AbstractRibbonCommand    : The Hystrix timeout of 20000ms for the command conta-service is set lower than the combination of the Ribbon read and connect timeout, 80000ms.
2018-07-26 23:13:49.562  INFO [example-service,3216d0de1384bb4f,404ff09c5cf91d2e,false] 3079 --- [nio-6000-exec-1] c.p.conta.service.AccountServiceImpl   : nova conta foi criada: test
```

- *`appname`*: O nome da aplicação que será logada `spring.application.name`
- *`traceId`*: ID que é atribuído a uma request
- *`spanId`*: ID de uma específica operação
- *`exportable`*: se o log deve ser exportado para [Zipkin](https://zipkin.io/)

#### Antes de começar
- Instale Docker e Docker Compose. [Config Docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-16-04-pt)
- Construa o projeto com maven utilizando o seguinte comando: `mvn clean package -DskipTests`

#### Executando o docker
Desta forma todas as imagens utilizadas serão baixado do docker hub.
Entre na pasta raiz onde foi realizado o clone do projeto onde está localizado o arquivo `docker-compose.yml` em seguida para construir as imagens `docker-compose build` e em seguinte `docker-compose up`


#### Importantes endpoints
- http://localhost:80 - Gateway
- http://localhost:8761 - Eureka Dashboard
- http://localhost:9000/hystrix - Hystrix Dashboard (Turbine stream link: `http://turbine-stream-service:8080/turbine/turbine.stream`)
- http://localhost:15672 - RabbitMq management (default login/password: guest/guest)

#### Notes
Além disso, o mecanismo de Descoberta de Serviço precisa de algum tempo após a inicialização de todos os aplicativos. Qualquer serviço não está disponível para descoberta pelos clientes até que a instância, o servidor Eureka e o cliente tenham todos os mesmos metadados em seu cache local.
