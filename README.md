# 최명표 포트폴리오 랜딩페이지

## 🌐 프로젝트 개요

**최명표(Choi Myeong Pyo)** 의 개인 포트폴리오 랜딩페이지입니다.  
Cloud Engineering · DevOps · SRE 전문가로서의 기술 스택, 경력, 프로젝트를 소개합니다.

---

## ✅ 구현된 기능

### 섹션 구성
- **Hero** - 이름, 역할, 인용구, 기술 스택 태그, 인터랙티브 터미널 윈도우
- **About** - 자기소개, Current Focus 카드 (4개)
- **Skills** - 6개 카테고리별 기술 스택 + 스킬바 애니메이션
- **Experience** - 타임라인 형식 경력 사항
- **Projects** - 필터링 가능한 프로젝트 카드 (6개)
- **Certifications** - 자격증 카드 + 기술 블로그 섹션
- **Contact** - 연락처 + 오픈 투 오퍼 카드
- **Footer** - 링크 및 카피라이트

### UX / 인터랙션
- **Sticky Navbar** - 스크롤 시 블러 효과 + 현재 섹션 하이라이트
- **터미널 애니메이션** - 타이핑 효과 터미널 윈도우
- **스킬바 애니메이션** - 스크롤 시 진입하며 바 채워짐
- **프로젝트 필터** - All / Cloud / DevOps / Automation / Security
- **파티클 배경** - 떠오르는 색상 파티클
- **스크롤 애니메이션** - IntersectionObserver 기반 등장 효과
- **커서 글로우** - 마우스 따라다니는 부드러운 빛 효과
- **반응형 디자인** - 모바일/태블릿/데스크탑 완전 지원
- **햄버거 메뉴** - 모바일 네비게이션

---

## 📁 파일 구조

```
index.html          # 메인 페이지
css/
  style.css         # 전체 스타일 (CSS Variables, 반응형)
js/
  main.js           # 인터랙션, 애니메이션, 필터 로직
README.md
```

---

## 🎨 디자인 특징

- **다크 테마** - #0a0e1a 기반 딥 다크 컬러
- **그라디언트 액센트** - 블루 → 퍼플 → 시안
- **JetBrains Mono** - 코드/터미널 요소에 사용
- **Inter** - 본문 폰트
- **CSS Variables** - 일관된 디자인 토큰 관리

---

## 🛠 사용 기술

- **HTML5** - 시맨틱 마크업
- **CSS3** - CSS Variables, Grid, Flexbox, Animations
- **Vanilla JavaScript** - IntersectionObserver, requestAnimationFrame
- **Font Awesome 6** - 아이콘
- **Google Fonts** - Inter, JetBrains Mono

---

## 📌 GitHub Pages 배포 방법

1. GitHub에 저장소 생성 (예: `portfolio`)
2. 모든 파일 업로드
3. Settings → Pages → Source: `main` branch, `/ (root)`
4. URL: `https://{username}.github.io/portfolio/`

---

## 🚀 추천 개선 사항

- [ ] GitHub 링크 실제 주소로 업데이트
- [ ] 자격증 정보 실제 취득 항목으로 정확하게 수정
- [ ] 경력 회사명 및 기간 실제 정보로 업데이트
- [ ] 프로젝트 상세 정보 보강 (실제 수치, 링크 등)
- [ ] OG 태그 추가 (소셜 미리보기)
- [ ] Google Analytics 연동
- [ ] 프로젝트 아키텍처 다이어그램 이미지 추가

---

**© 2025 최명표 · Cloud Engineer · DevOps · SRE**
