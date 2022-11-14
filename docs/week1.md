# week1


## 목차
1. controller
2. provider
3. service
4. module
5. middleware
6. Exception filter
7. pipes
8. guards
9. interceptor
10. custom decorator

## Controller
Controller는 MVC 패턴의 Controller의 기능을 수행한다. <br/>
요청을 URL을 통해 수신받고 해당 요청을 처리하여 반환한다.<br/>
@Controller 데코레이터를 사용하면 class를 Controller로 사용할 수 있다. 

### 라우팅
@Controller 데코레이터의 () 안에 적은 패턴은 Controller내부의 모든 메소드에 적용되고<br/>
@Get,@Post 등의 핸들러의 () 안에 적은 패턴은 각각의 메소드에만 적용된다.<br/>
ex) Controller(api/user) Get(/id) /api/user/id <br/>
패턴 안에는 wildcard를 사용할 수 있다.<br/>
ex) api/abc*e

## provider
provider는 다른 의존 주입이 가능한 모든 클래스를 말한다.<br/>
@Injectable 데코레이터를 사용한 모든 클래스는 provider가 된다.

## service
service는 MVC 패턴의 service의 기능을 수행한다.<br/>
Controller에게서 로직의 수행을 위임받아 로직을 수행한다.

## module
nodejs는 module이라는 단위 기능별로 프로그램을 나누어 설계한다.<br/>
나누는 기준은 개발자가 결정하며 각각의 module은 루트 모듈에 연결되어 어플리케이션 구조의 메타데이터를 제공해준다.<br/>
@Module 데코레이터로 module을 정의하며 해당 데코레이터는 4개의 속성을 가진다.
 - controllers : 해당 Module에서 정의되었고 인스턴스화 시키는 controller의 집합
 - providers : 해당 Module에서 인스턴스화 시키고 공유하는 provider의 집합
 - imports : 해당 Module에서 필요한 Module의 집합
 - exports : 해당 Module에서 제공하는 provider중 다른 Module이 사용할 수 있게 공유하는 provider의 집합

## middleware
middleware는 요청 핸들러 전에 코드를 실행하는 provider이다.<br/>
middleware도 controller와 같이 라우팅이 가능하다<br/>
provider이므로 @injectable 데코레이터를 사용하지만 단순한 기능의 경우 함수형으로 선언할 수도 있다.
Authentication 기능을 구현하는데에도 사용된다.

## Exception filter
Nest에서는 기본적으로 전역 예외 필터를 제공하지만 해당 기능이 아닌 개발자가 정의한 Exception 필터를 사용할 수도 있다.<br/>
해당 기능은 @Catch 데코레이터를 사용하며 ()안에 사용할 Exception의 종류를 넣어주는것으로 해당 Exception이 발생하였을 때에 실행되게 된다.

## pipes
pipe는 middleware와 비슷하게 요청 핸들러 전에 작동하는 provider이다<br/>
Data Transformation(데이터 변환) 기능과 Data Validation(데이터 유효성) 기능을 수행한다<br/>
 - Data Transformation : 입력 데이터를 핸들러에 맞게 형태를 변환시킨다.<br/>
 ex) String -> number
 - Data Validation : 입력 데이터를 검사하여 유효하지 않은 경우 예외를 발생시킨다.<br/>
 ex) String 10자리 이상일 경우 Exception

## guards
guard는 요청 핸들러 전에 코드를 실행하는 provider로 CanActive interface를 반드시 implement해야한다.<br/>
guard는 주로 Authorization기능으로 사용되며 모든 middleware 실행 후 intercepters나 pipe 전에 실행된다<br/>
ExecutionContext를 인자로 전달받기에 실행될 핸들러를 알 수 있으며 해당 핸들러에 필요한 권한을 판단할 수 있다<br/>

## interceptor
interceptor는 요청과 응답을 가로채 변형을 가하는 provider이다<br/>
interceptor를 이용하여 다음과 같은 기능을 수행할 수 있다<br/>
- 메서드 실행 전/후 추가 로직 바인딩
- 함수에서 반환된 결과를 변환
- 함수에서 던져진 예외를 변환
- 기본 기능의 동작을 확장
- 특정 조건에 따라 기능을 완전히 재정의(예: 캐싱)

## custom decorator
custom decoreator는 특정 기능을 decorator로 만들어 간단하게 사용할 수 있다<br/>
createParamDecorator()를 이용하여 decorator를 생성한다.




