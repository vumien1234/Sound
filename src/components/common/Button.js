import { Button } from '@mui/material';
import React from 'react';

const CustomButton = React.forwardRef((props, ref) => (
  <Button
    disabled={props.disabled}
    ref={ref}
    onClick={props.onClick}
    onBlur={props.onBlur}
    href={props.href}
    size={props.size || 'medium'}
    type={props.type || 'button'}
    shape={props.shape || 'rounded'}
    sx={{
      ...props.style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    variant={props.danger ? 'outlined' : 'contained'}
    color={props.danger ? 'error' : 'primary'}
    loading={props.loading}
    icon={props.icon}
  >
    {props.item}
  </Button>
));

export default CustomButton;
