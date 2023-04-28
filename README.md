## Hancom PDF SDK for Web<br/>개발자 가이드


### 요구 사항

- [최신 Node.js LTS](https://nodejs.org/en/download)
- [npm과 호환되는 패키지 관리자](https://docs.npmjs.com/about-npm)

### React 프로젝트에 통합

1. webpdfsdk 종속성 추가

```bash
npm install git+https://gitlab.hancom.io/mojung/webpdfsdk-dist.git
```

2. Hancom PDF SDK for Web 라이브러리를 public 디렉터리에 복사
```bash
cp -R ./node_modules\webpdfsdk\dist\libs public/libs
```

### PDF 표시
1. public/index.html 코드 추가
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link rel="stylesheet" href="%PUBLIC_URL%/libs/pdfjs/web/viewer.css" />
    <link
      rel="resource"
      type="application/l10n"
      href="%PUBLIC_URL%/libs/pdfjs/web/locale/locale.properties"
    />
    <script src="%PUBLIC_URL%/libs/pdfjs/build/pdf.js"></script>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

2. src/Components/WebPDF.js 파일 추가

```nodejs
import React, { useEffect, useRef } from 'react';
import webPdfLib from 'webpdfsdk/dist/webPdfLib';

function WebPDF() {
  useEffect(() => {
    webPdfLib.initialize(`${process.env.PUBLIC_URL}/libs`);
  }, []);
  
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
  });

  return <div id='pdfjs_content' dangerouslySetInnerHTML={{ __html: webPdfLib.getMainTemplate() }}></div>;
}

export default WebPDF;
```

3. 생성한 WebPDF 구성 요소 사용
```nodejs
import WebPDF from './WebPDF';
import Box from '@mui/material/Box';

const Content = () => {
  ...

  return (
    <Box id={'pdf_viewer_content'} sx={{ minWidth: minWidth(), minHeight: minHeight() }}>
      <WebPDF />
    </Box>
  );
};

export default Content;
```

4. 앱을 시작하고 기본브라우저에서 실행
```bash
npm start
```