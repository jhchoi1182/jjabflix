## 📂 잡플릭스

넷플릭스 클론 코딩   
<br>
특징: 넷플릭스 공식 홈페이지와 똑같음, 넷플릭스 공식 홈페이지의 버그 없음

<details>
<summary>
공식 홈페이지 버그
</summary>
<div>
  
![img](https://github.com/jhchoi1182/jjabflix/assets/116577489/2db70f39-3c22-42df-8b49-3663347b2e7b)


</details>


<br>

## 🛠 기술 스택

### ✔ Frond-end

<div>

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/react_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<br>
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/styledcomponent-DB7093?style=for-the-badge&logo=styledcomponent&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=&logoColor=white">


</div>


<br><br>

## ✨ 기능

<details>
<summary>
슬라이드 기능
</summary>
<div>

![image](https://github.com/jhchoi1182/jjabflix/assets/116577489/7c4472d9-1de4-4598-947b-6feac22fb242)


</details>


<details>
<summary>
북마크 기능
</summary>
<div>

![image](https://github.com/jhchoi1182/jjabflix/assets/116577489/0106ebda-e2b7-4b3e-8781-57868f972f58)


</details>

<details>
<summary>
검색 기능
</summary>
<div>

![image](https://github.com/jhchoi1182/jjabflix/assets/116577489/770201fc-1290-4746-afb3-c9d47b817742)

</details>


<details>
<summary>
상세 정보 모달
</summary>
<div>

![image](https://github.com/jhchoi1182/jjabflix/assets/116577489/5d49cd03-b3f6-4972-acd3-8012001298af)



</details>

<details>
<summary>
반응형 레이아웃
</summary>
<div>


![image](https://github.com/jhchoi1182/jjabflix/assets/116577489/7bc57cd3-a620-4fd7-9d42-72808e4e8f57)
  
![image](https://github.com/jhchoi1182/jjabflix/assets/116577489/5f4a7493-09d1-4aa6-b4af-1da25c9412b4)


</details>

<br>

#### 1. 넷플릭스와 똑같은 UI

* 검색, 북마크, 애니메이션 모달 등 넷플릭스의 기본 기능 구현
* 미디어 쿼리와 상태값을 사용하여 반응형 웹 애플리케이션을 구현
* 넷플릭스 공식 홈페이지의 슬라이드에서 발생하는 버그 없이 슬라이드 기능 구현
  * 슬라이드 기능에서 상태값과 transform-origin 속성이 충돌하는 문제가 발생
  * 상태값을 사용하던 로직을 DOM 메서드 사용하는 것으로 변경 ⇒ 정상 작동 확인
  * DOM 메서드 로직을 useRef로 교체
  * 컴포넌트를 분리하며 ref를 전역 관리하는 로직으로 수정
  * DOM 프로퍼티를 사용하는 로직으로 재수정 ⇒ 코드양 57% 감소
  * 디버깅 진행 ⇒ 문제가 framer-motion 라이브러리 자체의 버그 때문이었다는 것을 확인
  * 깃 허브 이슈를 통해 버그 해결책 확인

#### 2. 최적화를 진행해 UX 개선
* Web Vitals 성능 점수 개선 (슬라이드 아이템 6개 기준 as-is: 63점, to-be: 98점)
  * 프로젝트 구조를 변경하여 Header, Footer 리렌더링 최적화 작업
  * 메모이제이션을 이용해 리렌더링 최적화 작업
  * API 로직, display: flex 함수 등 리팩토링
  * 코드 스플리팅 적용
  * Intersection Observer API를 사용해 슬라이드의 50%가 보이면 다음 슬라이드가 렌더링 되는 커스텀훅 개발 ⇒ 렌더링 시간 80.61% 단축 (as-is: 57.7ms, to-be: 11.2ms)

#### 2. CI/CD를 통해 프로젝트의 리스크 분산
* Vercel 클라우드 서비스를 이용해 배포 자동화
* 지속적 통합 프로세스를 통해 문제 해결
  * 리팩토링 과정에서 폴더명 변경 ⇒ push ⇒ 빌드 실패
  * 모듈을 찾을 수 없다는 빌드 오류 메시지를 확인
  * 깃 허브 원격 저장소에 대소문자가 바뀐 것이 반영되지 않아 발생한 문제라는 것을 확인
  * git이 대소문자 바뀐 것을 인식하도록 git 설정 ⇒ push ⇒ 빌드  성공

#### 3. 다수의 커스텀훅 개발
* 즐겨찾기 관련 커스텀훅 생성
* 마우스 이벤트에 따른 투명도 조절 커스텀 훅 생성
* 반응형을 위한 뷰포트 너비 계산 커스텀 훅 생성
* 슬라이드 lazy loading을 위한 커스텀훅 생성
  * Intersection Observer API를 사용한 커스텀 훅
  * 슬라이드 렌더링을 위한 커스텀 훅

#### 4. 기타
* 타입 단언을 사용하지 않음으로써 프로젝트의 타입 안정성 강화


<br><br>


## 📚 트러블슈팅

<details>
<summary>
최적화 일지
</summary>
<div>
https://jhchoi1182.tistory.com/185
<div>
</details>
<details>
<summary>
레이아웃 세로 너비
</summary>
<div>
https://jhchoi1182.tistory.com/180
<div>
</details>
  <details>
<summary>
DOM 프로퍼티를 통한 전역 css 변수 조작
</summary>
<div>
https://jhchoi1182.tistory.com/176
<div>
</details>

#### Lessons Learned
* 재사용성 및 유지보수성을 높이기 위해 아토믹 패턴 적용 ⇒ <br>
재사용되는 컴포넌트가 많지 않아 오히려 프로젝트 구조만 복잡해지는 결과 초래 ⇒ <br>
디자인 패턴도 각 프로젝트 특성을 고려하여 적절하게 선택해야 한다는 것을 깨달음
* 슬라이드의 오류를 해결하기 위해 다양한 문제 해결 접근 방식을 적용 ⇒ <br>
적절한 해결책을 선택하는 역량 강화
* 버그가 없을 거라는 생각을 버리고 라이브러리에 대한 의존도 감소 ⇒ <br>
자체적인 개발 역량을 향상시키기 위해 JavaScript와 React만으로 기능을 개발하는 습관을 들여 레퍼런스를 추가 중

