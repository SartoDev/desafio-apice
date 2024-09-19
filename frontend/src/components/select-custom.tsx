import { Select } from '@mui/material';
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(Select)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: '#1A2027',
    border: '1px solid',
    borderColor: '#1A2027',
  },
}));

export default function SelectCustom(props: any) {
  return (
    <SelectCustom native={false} children={props.children} onChange={props.onChange} label={props.label} defaultValue={props.defaultValue}/>
  );
}
