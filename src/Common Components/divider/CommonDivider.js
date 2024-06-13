import React from 'react';
import { Divider as MuiDivider } from '@mui/material';

const CommonDivider = ({ color = '#0B83A5', height = 1, orientation = 'horizontal', ...props }) => {
  return (
    <div className='my-1'>

        <MuiDivider
          sx={{
            backgroundColor: color,
            height: `${height}px`,
            transform: orientation === 'vertical' ? 'rotate(-90deg)' : undefined
          }}
          orientation={orientation}
          {...props}
        />
    </div>
  );
}

export default CommonDivider;
