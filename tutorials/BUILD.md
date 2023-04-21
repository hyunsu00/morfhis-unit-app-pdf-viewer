# 빌드방법
## extern 패키지
- extern 패키지 인스톨
```bash
# 1. pdf.js 관련 패키지 설치 (실행경로 : ${workspaceRoot})
npm install -g gulp-cli
cd ./extern/pdf.js && npm install --ignore-scripts --force
cd ../../

# 2. pdf-annotate.js 관련 패키지 설치 (실행경로 : ${workspaceRoot})
cd ./extern/pdf-annotate.js && npm install
cd ../../

# 3. annotpdf 관련 패키지 설치 (실행경로 : ${workspaceRoot})
cd ./extern/pdfAnnotate && npm install
cd ../../

# 4. pdf-lib 관련 패키지 설치 (실행경로 : ${workspaceRoot})
cd ./extern/pdf-lib && npm install
cd ../../
```
- extern 라이브러리 빌드
```bash
#  (실행경로 : ${workspaceRoot})
npm run libs
```
- extern 라이브러리 정리
```bash
#  (실행경로 : ${workspaceRoot})
npm run clean
```

## 메인 패키지
```bash
# 메인 패키지 설치 (실행경로 : ${workspaceRoot})
npm install

# 메인 실행 (실행경로 : ${workspaceRoot})
npm start
```