import { AssetsTableRoute } from './routes/AssetsTableRoute';
import { css } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div
        css={css({
          marginBottom: 20,
        })}
      />
      <AssetsTableRoute />
    </React.Fragment>
  );
}

export default App;
