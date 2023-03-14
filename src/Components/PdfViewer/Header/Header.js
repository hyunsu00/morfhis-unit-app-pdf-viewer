import { AppBar, Box, Toolbar, Button, Divider } from '@mui/material';
import actionManager from '../../../web-pdf-lib/action/actionManager';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', height: '64px', bgcolor: 'background.paper' }}>
      <AppBar sx={{ display: 'flex', flexDirection: 'row', boxSizing: 'border-box', height: 'inherit', alignItems: 'center', bgcolor: 'background.paper' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 0,
          }}>
          <Toolbar variant='dense'>
            <Button
              onClick={(event) => {
                actionManager.execute({ name: 'd_open' });
              }}>
              열기
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button disabled onClick={(event) => {}}>
              복사하기
            </Button>
            <Button disabled onClick={(event) => {}}>
              모두선택
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button
              disabled
              onClick={(event) => {
                actionManager.execute({ name: 'd_find' });
              }}>
              찾기
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button
              onClick={(event) => {
                actionManager.execute({ name: 't_select' });
              }}>
              선택
            </Button>
            <Button
              onClick={(event) => {
                actionManager.execute({ name: 't_hand' });
              }}>
              손도구
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button onClick={(event) => {}}>선그리기</Button>
            <Button onClick={(event) => {}}>직사각형</Button>
            <Button onClick={(event) => {}}>자유형그리기</Button>
            <Button onClick={(event) => {}}>스티커노트</Button>
            <Button onClick={(event) => {}}>텍스트</Button>
            <Button onClick={(event) => {}}>밑줄</Button>
            <Button onClick={(event) => {}}>취소선</Button>
            <Button
              onClick={(event) => {
                actionManager.execute({ name: 'a_highlight' });
              }}>
              형광펜
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button
              onClick={(event) => {
                actionManager.execute({ name: 'e_show_mode_start' });
              }}>
              쇼 보기
            </Button>
            <Button
              onClick={(event) => {
                actionManager.execute({ name: 'e_show_mode' });
              }}>
              현재 슬라이드부터 쇼 보기
            </Button>
            <Divider orientation='vertical' flexItem />
            <Button
              onClick={(event) => {
                actionManager.execute({ name: 'document_window' });
              }}>
              문서창
            </Button>
            <Button onClick={(event) => {}}>작업창</Button>
            <Divider orientation='vertical' flexItem />
            <Button onClick={(event) => {}}>축소</Button>
            <Button onClick={(event) => {}}>확대</Button>
            <Button onClick={(event) => {}}>100%</Button>
            <Button onClick={(event) => {}}>쪽 맞춤</Button>
            <Button onClick={(event) => {}}>폭맞춤</Button>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
