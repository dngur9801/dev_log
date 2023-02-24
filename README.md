# 마크다운 형식으로 블로그를 작성할 수 있는 "Devlog"


## # 프로젝트 설명
> 개발자들을 위한 마크다운 블로그 “Devlog”는 마크다운을 이용하여 손쉽게 블로그를 작성 할 수 있고 게시물을 서로 공유할 수 있는 사이트 입니다. 모든페이지는 반응형으로 제작되었습니다.


## # 프로젝트 배포
- front-end : vercel ([https://www.devlog.shop/](https://www.devlog.shop/))
- back-end : cloudetype
- MariaDB : cloudetype

## # 사용 기술
- front-end : TypeScript, Next.js, react-query, recoil, styled-component, toast-ui
- back-end : express, sequelize
- database : MariaDB

## # 주요 기능
- [x] 로그인
  - 서버측에서 발급한 Session id를 브라우저에 쿠키를 사용해서 저장을 하였고,<br/> 데이터 요청시 쿠키를 header에 포함하여 사용자인증을 할 수 있도록 진행하였습니다.  
  - 로그인 후 새로고침시 CSR로 인한 화면 깜빡임으로 인해 SSR을 적용하여<br/> 서버사이드에서 미리 데이터를 받아온뒤 처리하여 개선하였습니다.
- [x] 게시물 기능
  - toast ui 라이브러리를 사용하여 마크다운 형식으로 글을 작성할 수 있도록 구현하였습니다.
- [x] 댓글 기능
- [x] 좋아요 기능
- [x] 게시물 정렬
  - 인기순, 최신순, 좋아요한 게시물만 볼 수 있는 북마크 정렬기능을 구현하였습니다.
- [x] 유저페이지
- [x] 설정페이지
  - (프로필 이미지 수정 / 프로필 닉네임, 소개글 수정 / 블로그 제목 수정 / 회원탈퇴)
- [x] 게시물 검색
  - 스크롤 이벤트에 디바운싱 기법을 적용하여 성능을 개선하였습니다.
- [x] 다크모드
- [x] 공개 범위 설정
  - 게시물을 공개 혹은 비공개 방식으로 설정할 수 있습니다.
- [x] 반응형
  - 모든페이지는 반응형으로 제작하였습니다.
- [x] SEO
  - 구글 검색엔진 최적화를 진행하였습니다. 구글에 검색시 해당사이트가 노출됩니다.
  
## # 프로젝트 진행중 마주친 이슈와 해결
- https://velog.io/@dngur9801/Next.jsurl에-특정-문자열-삽입하기
- [https://velog.io/@dngur9801/Next.jsstyled-components-적용전-렌더-에러-해결법](https://velog.io/@dngur9801/Next.jsstyled-components-%EC%A0%81%EC%9A%A9%EC%A0%84-%EB%A0%8C%EB%8D%94-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%EB%B2%95)
- [https://velog.io/@dngur9801/express-서로-다른-도메인-쿠키-전송하기](https://velog.io/@dngur9801/express-%EC%84%9C%EB%A1%9C-%EB%8B%A4%EB%A5%B8-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%BF%A0%ED%82%A4-%EC%A0%84%EC%86%A1%ED%95%98%EA%B8%B0)
- [https://velog.io/@dngur9801/Next.jsNext.js-프로젝트-Vercel-배포시-next-autherrorCLIENTFETCHERROR-해결](https://velog.io/@dngur9801/Next.jsNext.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Vercel-%EB%B0%B0%ED%8F%AC%EC%8B%9C-next-autherrorCLIENTFETCHERROR-%ED%95%B4%EA%B2%B0)
- [https://velog.io/@dngur9801/Vercel로-배포한-프로젝트-렌더링-속도-이슈](https://velog.io/@dngur9801/Vercel%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%86%8D%EB%8F%84-%EC%9D%B4%EC%8A%88)
- [https://velog.io/@dngur9801/netERRBLOCKEDBYRESPONSE.NotSameOrigin-에러](https://velog.io/@dngur9801/netERRBLOCKEDBYRESPONSE.NotSameOrigin-%EC%97%90%EB%9F%AC)
