# Welcome to 'The greatest habit'

The Greatest Habit 은 당신이 세운 목표가 단순 기록으로 끝나지 않게 만듭니다.
목표 작성과 동시에 생성되는 월간/주간/일간 실행 계획과 동기부여 기능을 통해 당신이 세운 목표를 달성해보세요.

The Greatest Habit 은 현재 MVP 제작 단계에 있습니다.
(git repository 를 private 로 변경할 예정입니다.)

## 개발 타임라인

- 2025.08.26:
  - demo day 에서 나온 피드백 적용 시작.
- 2025.07.30:
  - demo day 를 위한 배포.
- 2025.07.24:
  - home-page > bento-grid 내용 정리.
- 2025.07.22:
  - FAQ 관련 페이지 작업 완료.
- 2025.07.21:
  - 모바일 화면 대응을 위해 스타일 적용.
- 2025.07.19:
  - 회원 가입시 트랜잭션 이메일 전송 기능 구현.
- 2025.07.16:
  - cron job 추가.
- 2025.07.14:
  - 모든 테이블에 대한 RLS 정책을 작성.
  - 일부 DB schema 수정.
  - url map 수정. 그에 따라 routes.ts 수정 및 페이지 변경.
  - data model planning 수정.
- 2025.07.07 :
  - DB schema 추가.
  - wemake 에서 배운 DB 관련 작업 추가.
  - about-page.tsx 에 loader 적용.
- 2025.06.30 :
  - join-page, sign-in-page > UI 작업 완료.
  - navigation 수정.
  - home-page > CoverPage component 작업 완료. scroll snap 추가.
- 2025.06.25 :
  - routes.ts 에 정의된 페이지에 대한 파일 생성 및 네비게이션 연결.
- 2025.06.24 :
  - navigation 추가.
  - navigation bar 영역에 배치한 test switch 를 통해 navigation 변경을 테스트.
- 2025.06.22 :
  - create project.

## 완료하지 못한 작업 정리

- 전체 UI 에 대한 Wireframe 정리
- Dashboard UI 작업
- Habits / Goals page UI 작업
- Habit / Goal detail page UI 작업
- Reward page UI 작업
- Notification / Profile / Settings page UI 작업
- public page 작업
  - Tutorial page UI 작업 & DB 연결
  - About page UI 개선

## Nico 쌤의 피드백

- 습관을 만드는 앱이라면 가장 중요한 건 진입 장벽을 낮추는 것입니다. 대부분의 앱들은 너무 많은 걸 요구해요. 계정을 만들고, 프로필을 작성하고, 목표를 설정하는 과정이 너무 길죠. 그렇게 하면 사람들이 지쳐서 이탈하게 됩니다.
- 그러니 이렇게 하세요.
- 첫째, 바로 사용해 볼 수 있게 하세요. 가입이나 복잡한 정보를 입력하는 과정 없이, 사용자들이 앱을 빠르게 시도해 볼 수 있게 해야 합니다.
  - 예를 들어, 모두가 살을 빼고 싶어하거나 달리고 싶어 하잖아요? 그러면 매주 열리는 ‘챌린지’ 같은 걸 만들어서 바로 참여할 수 있게 하세요.
- 둘째, 습관을 빠르게 만들어주세요.
  - 사람들이 앱에 들어와서 바로 가치를 느끼고, 참여할 수 있어야 합니다. 그렇게 해서 이 앱을 쓰는 것이 하나의 습관처럼 느껴지게 만드는 거죠. 챌린지를 통해 앱의 매력을 느끼게 되면, 그때 가서 자신의 진짜 목표를 설정하게 될 겁니다.
