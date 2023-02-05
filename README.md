# devlog
블로그 프로젝트 (next.js)

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
- 로그인
  - 서버측에서 발급한 Session id를 브라우저에 쿠키를 사용해서 저장을 하였고,<br/> 데이터 요청시 쿠키를 header에 포함하여 사용자인증을 할 수 있도록 진행하였습니다.  
  - 로그인 후 새로고침시 CSR로 인한 화면 깜빡임으로 인해 SSR을 적용하여<br/> 서버사이드에서 미리 데이터를 받아온뒤 처리하여 개선하였습니다.
- 게시물 등록 / 수정 / 삭제
  - toast ui 라이브러리를 사용하여 마크다운 형식으로 글을 작성할 수 있도록 구현하였습니다.
- 댓글 등록 / 수정 / 삭제
- 좋아요 기능
- 게시글 인기순 / 최신순 정렬
- 유저페이지 (유저게시물 조회)
- 설정페이지 (프로필 이미지 수정 / 프로필 닉네임, 소개글 수정 / 블로그 제목 수정 / 회원탈퇴)
- 게시물 검색
- 다크모드
- 공개 범위 설정 (private, public)
- 반응형
  - 모든페이지는 반응형으로 제작하였습니다.
- SEO
  - 구글 검색엔진 최적화를 진행하였습니다. 구글에 검색시 해당사이트가 노출됩니다.
