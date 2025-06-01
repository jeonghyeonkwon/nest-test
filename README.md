# test 프로젝트

## 명령어

### NestJS CLI

```bash
nest g res domain_name
```

### 마이그레이션 테이블 만들기

```bash
npx knex migrate:make table_name --knexfile knexfile.js
```

### 마이그레이션 테이블 생성

```bash
npx knex migrate:latest --knexfile knexfile.js
```

### init 데이터 만들기

```bash
npx knex seed:make file_name --knexfile knexfile.js
```

### 특정 init 실행

```bash
npx knex seed:run --specific=file_name --knexfile knexfile.js
```

## tree 테스트

- 데이터 서버에서 트리 구조 만들기

---

## MSA에서 분리된 data 테스트

- (driving, driven) table은 각각 다른 DB의 데이터라는 가정
- JOIN을 할 수 없는 상황에서의 페이징, 카운트 쿼리 테스트

---
