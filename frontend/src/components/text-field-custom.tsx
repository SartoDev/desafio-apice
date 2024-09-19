import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const BootstrapInput = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    backgroundColor: '#1A2027',
    border: '1px solid',
    borderColor: '#1A2027',
  },
  "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#ffffff",
  },
}));

export default function TextFieldCustom(props: any) {
  return (
    <BootstrapInput
      disabled={props.disabled} value={props.value} slotProps={props.slotProps} onChange={props.onChange} type={props.type}
      className={props.className ? props.className : 'w-full'} label={props.label} defaultValue={props.defaultValue} />
  );
}
