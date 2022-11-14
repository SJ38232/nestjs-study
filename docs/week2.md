# Week 2
## 목차
 1. 커스텀 프로바이더
 2. 비동기 프로바이더
 3. 동적 모듈
 4. 주입 스코프
 5. 순환 종속성
 6. 모듈 참조
 7. 지연 로딩 모듈
 8. 실행 컨택스트
 9. 라이프사이클 이벤트
 10. 플랫폼 불가지론
 11. 테스트


## 커스텀 프로바이더
커스텀 프로바이더는 다음과 같은 경우 사용한다.
- Nest 프레임워크가 만들어주는 인스턴스 또는 캐시된 인스턴스 대신 직접 인스턴스를 생성하고 싶은 경우
- 여러 클래스가 의존 관계에 있을 때 이미 존재하는 클래스를 재사용하고자 할 때
- 테스트를 위해 모의(mock) 버전으로 프로바이더를 재정의하려는 경우

  ### 밸류 프로바이더
  provide와 useValue 속성을 가지며 useValue는 모든 타입을 받을 수 있어 외부 라이브러리의 프로바이더를 삽입받거나 모의 객체로 대체할 수 있다.

  ### 클래스 프로바이더
  provide와 useClass 속성을 가지며 useClass속성을 이용하여 동적으로 인스턴스를 구성할 수 있다.

  ### 팩토리 프로바이더
  useFactory함수를 작성하여 로직을 구성하고 리턴하는 형식으로 사용한다. 만약 프로바이더를 주입받을 경우 inject속성에 다시 선언해주어야 한다.

  ### 별칭 프로바이더
  프로바이더에 별칭을 붙여 별칭으로 해당 프로바이더에 접근이 가능해진다. 

## 비동기 프로바이더
async와 await를 이용하여 비동기로 프로바이더를 선언할 수 있다.

## 동적 모듈
모듈이 생성될 때에 동적으로 값을 설정하는 방식으로 주로 환경변수 설정같은 곳에 사용할 수 있다.
register, forRoot, forFeature중 하나의 메소드를 정의하여 해당 메소드를 통해 동적으로 값을 설정한다.<br/>
해당 컨벤션의 구분은 다음과 같이 이루어진다.
- register : import하는 모듈에서만 사용할 용도로 특정 설정을 적용하는 경우
- forRoot : 특정 설정을 모듈에 적용하고 해당 모듈을 여러곳에서 재사용하는 경우
- forFeature : forRoot에서 구성한 모듈을 사용하되 import하는 곳에서 특화된 세부 설정이 필요한 경우
## 주입 스코프
기본적으로 NestJs는 싱글톤 인스턴스를 사용하지만 요청단위 생명주기나 다른 예외 케이스가 존재하기도 한다.
해당 사항의 경우 Injection scope를 사용하여 원하는 생명주기를 적용하는 방법이 있다.

  ### provider scope
  provider는 다음과 같은 scope를 가질 수 있다.
  - DEFAULT : 싱글톤으로 생성됨
  - REQUEST : 각 요청당 하나의 인스턴스가 생성됨
  - TRANSINT : 공유되지 않음

  ### Request Scope
  Request Scope인 컴포넌트와 의존관계가 있을시에 해당 컴포넌트가 다른 Scope를 가지고 있어도 Request Scope가 된다. 또한 Request Scope로 응답을 처리할 경우 singleton의 경우보다 성능이 저하되므로 정말 필요한 곳에서만 사용하여야 한다. 
## 순환 종속성
순환 종속성을 피하기 위해 NestJS에서는 정방향 참조와 ModuleRef 클래스를 사용하는 방법을 이용한다.
  ### 정방향 참조
  forwardRef() 유틸리티 함수를 이용하여 순환 정속성을 피한다.
## 모듈참조
ModuleRef 클래스로 내부 provider리스트를 탐색하고 injection token을 조회 키로 사용하여 provider에 대한 참조를 얻을 수 있다.
해당 moduleRef 인스턴스의 get 메소드를 이용하여 현재 모듈의 injectable 인스턴스 즉 provider들을 검색할 수 있다.
get 메소드로는 scope가 default인 인스턴스만 검색할 수 있으며 다른 scope의 경우 resolve()메소드를 사용한다. 
## 지연로딩 모듈
일반적인 서버에서는 모든 모듈이 어플리케이션 시작 시간과 동시에 로딩되는 편이 좋지만 serverless enviroment에서는 병목현상이 일어날 수 있다. 지연 로딩을 이용하면 해당 환경에서 bootstrap의 시간을 줄여 빠른 기동이 가능하다.지연로딩은  LazyModuleLoader를 constructor에 주입하는 것으로 사용할 수 있다.
## 실행 컨텍스트
어플리케이션 컨텍스트에서 작동하는 여러 유틸리티 클래스를 제공하는데 이를 이용하여 가드, 필터, 인터셉터를 빌드하는데에 사용할 수 있는 실행 컨텍스트의 정보를 제공한다.

### ArgumentsHost Class
핸들러에 전달되는 인수를 검색하는 메서드를 제공하고 host매개변수로 참조되는 ArgumentHost를 제공한다.
### ExecutionContext Class
ArgumentHost를 확장하여 현재 실행 프로세스에 대한 추가 세부 정보를 제공한다.
## 라이프 사이클 이벤트
LifeCycle 이벤트에 대한 가시성을 제공하는 lifecycle hook과 발생 시 조치(모듈, 주입 가능한 또는 컨트롤러에 등록된 코드를 실행)할 수 있는 기능을 제공한다.<br/>
다음과 같은 순서로 이벤트가 발생한다<br/>
onModuleInit -> onApplicationBootstrap -> Termination signal receive -> onModuleDestroy -> beforeApplicationShutdown -> onApplicationShutdown
## 플랫폼 불가지론
Nest는 플랫폼에 구애받지 않는 프레임워크로 다양한 애플리케이션에서 재사용 가능한 논리적 부분을 개발할 수 있다.