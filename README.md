# morfhis-unit-app-pdf-viewer

## 패키지 인스톨
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