# WEEBUR 프론트엔드 과제
> 상품 리스트 조회 및 등록 기능을 구현한 Next.js 애플리케이션

<br>
<br>

## 🛠 기술 스택 및 선택 이유

> ### Core Framework
- ### Next.js 14 (App Router)
  - SSR/SSG 지원으로 초기 로딩 성능 향상
  - 파일 기반 라우팅으로 직관적인 페이지 구조
  - App Router를 통한 최신 Next.js 패러다임 활용

- ### TypeScript
  - 정적 타입 검사로 런타임 오류 방지
  - 개발 도구 지원 향상 (자동완성, 리팩토링)
  - 팀 협업 시 코드 가독성 및 유지보수성 향상

<br>

> ### 상태 관리 및 데이터 Fetching
- ### TanStack Query (React Query)
  - 서버 상태와 클라이언트 상태의 명확한 분리
  - 캐싱, 백그라운드 동기화, 로딩 상태 관리 자동화
  - Error Handling의 편리함
 
> ### 폼 관리
- ### React Hook Form + Zod
  - 성능 최적화된 폼 관리 (uncontrolled component 방식)
  - Zod를 통한 런타임 타입 검증 및 스키마 기반 유효성 검사
  - TypeScript와의 높은 호환성

> ### 스타일링
- ### Tailwind CSS
  - 유틸리티 우선 방식으로 빠른 스타일링
  - 일관된 디자인 시스템 구축

 
<br>
<br>


## ✨ 주요 기능
- ### 상품 리스트 페이지 (`/products`)
  - 20개 상품 목록 조회
  - List/Grid 뷰 랜덤 배정 (24시간 고정)
  - 상품 등록 페이지 이동 버튼

- ### 상품 등록 페이지 (`/products/new`)
  - React Hook Form을 활용한 폼 관리
  - Zod 스키마 기반 유효성 검사
  - 할인 적용 최종 가격 실시간 계산
  - 등록 완료 시 상품 목록 페이지 이동
    
<br>
<br>


## 📐 개발 계획 및 설계 과정
### 1단계 : 요구사항 분석 및 구조 설계
```
프로젝트 구조 설계
├── 페이지 구조 (/products, /products/new)
├── 컴포넌트 분리 전략
├── 상태 관리 방식 결정
└── API 연동 구조 설계
```

### 2단계 : 핵심 기능별 개발 우선순위
1. **기본 라우팅 및 레이아웃** 구성
2. **상품 조회 기능** (API 연동, 컴포넌트 분리)
3. **View 타입 랜덤 로직** (LocalStorage 활용)
4. **상품 등록 폼** (유효성 검사, 실시간 계산)

### 3단계 : 확장성을 고려한 아키텍처
- **관심사 분리** : UI 컴포넌트 / 비즈니스 로직 / 데이터 레이어
- **재사용 가능한 컴포넌트** : Form 관련 컴포넌트 모듈화
- **서비스 레이어** : API 호출과 비즈니스 로직 분리


<br>
<br>

## 🚧 개발 중 이슈 및 해결 과정
### 🧐 서비스 로직, 훅, 유틸의 확장성 있는 분리를 고민하다

#### 문제 상황
초기에 작성한 코드는 기능적으로는 잘 동작했지만, 더 나은 책임 분리와 확장성을 고려했을 때 개선할 여지가 있었습니다.

```ts
// 기존 코드 (api.ts)
export const getProducts = async (limit: number = 20): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
  if (!res.ok) throw new Error('상품 로드 실패');
  const data = await res.json();
  return data.products;
};

// 기존 코드 (viewPref.ts) 
export const getViewPref = (): ViewType => {
  if (typeof window === 'undefined') return 'list';
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return saveRandomView();
  // ... 로직 처리
};
```

<br>

#### 고민했던 지점들
- 함수 기반 API가 객체 기반 API보다 확장성 측면에서 제한적
- localStorage 접근과 비즈니스 로직이 한 함수에 섞여있음
- 테스트 작성 시 각 책임을 독립적으로 검증하기 어려움
- 새로운 storage 타입 (sessionStorage 등) 추가 시 유연성 부족

<br>

#### 해결 과정
**1단계 : 객체 기반 서비스로 리팩토링**
```ts
// Before: 함수 기반
export const getProducts = async (limit: number = 20) => { ... };
export const addProducts = async (product: AddProductRequestBody) => { ... };

// After: 객체 기반 서비스
export const productService = {
  async get(limit: number = 20): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
    if (!res.ok) throw new Error('상품 로드 실패');
    const data = await res.json();
    return data.products;
  },
  async add(product: AddProductRequestBody): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('상품 추가 실패');
    return res.json();
  }
};
```

<br>

**2단계: Storage 유틸리티 추상화**
```ts
// Before: 직접 localStorage 사용
const raw = localStorage.getItem(STORAGE_KEY);
localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

// After: 추상화된 storage 유틸리티
export const local = {
  get<T>(k: string): T | undefined {
    try {
      if (typeof window === 'undefined') return undefined;
      return JSON.parse(localStorage.getItem(k) ?? 'null');
    } catch {
      return undefined;
    }
  },
  set(k: string, v: unknown) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(k, JSON.stringify(v));
    }
  }
};
```

<br>

**3단계: 비즈니스 로직과 스토리지 로직 분리**
```ts
// Before: 한 함수에서 모든 책임 처리
export const getViewPref = (): ViewType => {
  // storage 접근 + 유효성 검사 + 랜덤 생성 + 저장
};

// After: 책임별 분리
export const viewPrefService = {
  get(): ViewType {
    const saved = local.get<StoredViewType>(STORAGE_KEY);
    if (!saved || Date.now() - saved.at > DAY) {
      return this.reset();
    }
    return saved.type;
  },
  reset(): ViewType {
    const viewType = Math.random() < 0.5 ? 'list' : 'grid';
    local.set(STORAGE_KEY, { type: viewType, at: Date.now() });
    return viewType;
  }
};
```

<br>

**4단계: 네임스페이스 및 일관성 확보**
```ts
// 일관된 네이밍 컨벤션 적용
productService.get() / productService.add()
viewPrefService.get() / viewPrefService.reset()
local.get() / local.set()
```

<br>

#### 개선 효과
|개선 전|개선 후|
|----|----|
|함수 기반 API|객체 기반 서비스 패턴|
|localStorage 직접 접근|추상화된 storage 유틸리티|
|단일 함수 내 여러 책임|메서드별 단일 책임|
|개별 함수 export|서비스 객체 단위 관리|

<br>

#### 확장성 측면에서의 이점
1. 새로운 storage 추가 시 `local` 객체만 수정해도 됨
2. 각 서비스의 메서드를 독립적으로 테스트 가능
3. API 엔드포인트 추가 시 `porductService` 객체에 메서드만 추가하면 됨
4. 비즈니스 로직 변경 시 해당 책임을 가진 메서드만 수정하면 됨

위와 같은 구조 변경을 통해 코드의 가독성과 유지보수성을 높이고,
<br>향후 기능 확장 시에도 기존 코드에 미치는 영향을 최소화할 수 있습니다.

<br>


---

<br>

### 🔄 선언적 분기를 위한 SwitchCase 컴포넌트 도입
#### 문제 상황
초기 `RandomView` 컴포넌트는 단순한 이분법적 조건부 렌더링으로 구성되어 있었습니다.

```tsx
// Before: 제한적인 조건부 렌더링
const RandomView = ({ list, grid }: RandomViewProps) => {
  const viewType = useViewType();
  if (viewType === 'grid') return grid;
  return list;
};
```
하지만 이런 구조는 다음과 같은 한계점을 가지고 있었습니다.
- 확장성 부족 : 새로운 뷰 타입 추가 시 컴포넌트 전체 수정 필요
- AB 테스팅 제약 : 복잡한 조건부 로직 처리 어려움
- 피처 플래그 대응 한계 : 다중 조건 처리 시 코드 복잡도 급증
- 재사용성 부족 : 다른 조건부 렌더링 상황에서 활용 불가

<br>

#### 리팩토링 과정 및 설계 철학
**1단계 : 제네릭 기반 추상화**
```tsx
// After: 제네릭을 활용한 확장 가능한 SwitchCase
type Key = string | number | symbol;

type SwitchCaseProps<Case extends Key> = {
  value: Case;
  cases: Partial<Record<Case, ReactElement>>;
  default?: ReactElement;
};

const SwitchCase = <Case extends Key>(props: SwitchCaseProps<Case>) => {
  return props.cases[props.value] ?? props.default ?? null;
};
```

<br>

**2단계 : 선언적 조건부 렌더링 구현**
```tsx
// 기존 명령형 스타일에서 선언적 스타일로 전환
const RandomView = ({ items }: RandomViewProps) => {
  const viewType = useViewType();

  return (
    <SwitchCase
      value={viewType}
      cases={{
        list: <ProductList items={items} />,
        grid: <ProductGrid items={items} />,
      }}
      default={<ProductList items={items} />}
    />
  );
};
```

<br>

#### 확장성 측면에서의 이점

1. AB 테스팅 시나리오 대응
```tsx
// 다양한 실험 그룹을 쉽게 추가 가능
<SwitchCase
  value={experimentGroup}
  cases={{
    control: <StandardLayout />,
    variant_a: <NewLayout />,
    variant_b: <ExperimentalLayout />,
    variant_c: <BoldLayout />,
  }}
  default={<StandardLayout />}
/>
```

2. 복잡한 피처 플래그 조합 처리
```tsx
// 피처 플래그 조합을 키로 사용
const featureKey = `${hasNewUI}_${hasAdvancedFeatures}_${userTier}`;

<SwitchCase
  value={featureKey}
  cases={{
    'true_true_premium': <PremiumAdvancedUI />,
    'true_false_premium': <PremiumBasicUI />,
    'false_true_premium': <LegacyAdvancedUI />,
    'true_true_standard': <StandardAdvancedUI />,
  }}
  default={<LegacyBasicUI />}
/>
```

3. 사용자 세그먼트별 개인화
```tsx
// 사용자 특성에 따른 다양한 경험 제공
<SwitchCase
  value={userSegment}
  cases={{
    new_user: <OnboardingView />,
    power_user: <AdvancedDashboard />,
    enterprise: <EnterpriseView />,
    mobile_first: <MobileOptimizedView />,
  }}
  default={<StandardView />}
/>
```

<br>

#### 개발자 경험 개선 효과
|측면|기존 방식|리팩토링 후|
|---|---------|---------|
|새 조건 추가|컴포넌트 로직 수정|`cases` 객체에 케이스만 추가|
|조건 제거|if-else 구조 재작성|해당 케이스만 삭제|
|기본값 처리|마지막 return문으로 처리|`default` prop으로 명시적 처리|
|타입 안정성|수동 타입 체크 필요|제네릭으로 자동 타입 추론|
|가독성|중첩 조건문으로 복잡|선언적 객체 구조로 직관적|

<br>

#### 결론
단순해 보이는 조건부 렌더링 리팩토링이지만, 이는 다음과 같은 더 큰 아키텍처 철학을 반영합니다.
- **확장성 우선 설계** : 추후 요구사항 변화에 유연하게 대응
- **선언적 프로그래밍** : 무엇을 렌더링할지에 집중, 어떻게 렌더링할지는 추상화
- **타입 안정성** : 컴파일 타임에 오류를 잡아내는 견고한 구조
- **개발자 경험** : 새로운 기능 추가 시 최소한의 코드 변경으로 최대 효과

이러한 접근 방식은 특히 빠르게 변화하는 비즈니스 요구사항과
<br>다양한 사용자 테스트가 필요한 웹 애플리케이션에서 도움이 될 수 있을 것으로 생각합니다.

<br>
<br>

## 📁 프로젝트 구조

```markdown
src/
├── app/
│   ├── components/          # UI 컴포넌트
│   │   ├── FormErrorMessage.tsx
│   │   ├── FormLabel.tsx
│   │   ├── FormList.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductList.tsx
│   │   ├── Providers.tsx
│   │   └── RandomView.tsx
│   ├── products/
│   │   ├── page.tsx         # 상품 목록 페이지
│   │   └── new/
│   │       └── page.tsx     # 상품 등록 페이지
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── hooks/                   # 커스텀 훅
│   ├── useProducts.ts
│   └── useViewType.ts
├── services/               # API 서비스 레이어
│   ├── productService.ts
│   └── viewPrefService.ts
├── types/                  # TypeScript 타입 정의
│   └── product.ts
└── utils/                  # 유틸리티 함수
    └── storage.ts
```

<br>
<br>

## 🚀 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start
```
