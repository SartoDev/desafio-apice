import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import TextFieldCustom from "@/components/text-field-custom";

export default function PessoaCreate() {
  const router = useRouter();
  const [pessoa, setPessoa] = useState<any>({});
  const [cidadeList, setCidadeList] = useState<any[]>();
  const [bairroList, setBairroList] = useState<any[]>();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/cidades`)
      .then((response) => response.json())
      .then((data) => setCidadeList(data))
  }, []);

  const handleChangeName = (event: any) => {
    setPessoa({ ...pessoa, nome: event.target.value });
  };

  const handleChangeCity = (event: any) => {
    setPessoa({ ...pessoa, cidade: event.target.value });
    fetch(`http://localhost:3001/bairros?cidadeId=${event.target.value.id}`)
      .then((response) => response.json())
      .then((data) => setBairroList(data))
  };

  const handleChangeNeighborhood = (event: SelectChangeEvent) => {
    setPessoa({ ...pessoa, bairro: event.target.value });
  };

  const handleChangeCEP = (event: any) => {
    setPessoa({ ...pessoa, cep: event.target.value });
  };

  const handleChangeAddress = (event: any) => {
    setPessoa({ ...pessoa, endereco: event.target.value });
  };

  const handleChangeNumber = (event: any) => {
    setPessoa({ ...pessoa, numero: parseInt(event.target.value) });
  };

  const handleChangeComplement = (event: any) => {
    setPessoa({ ...pessoa, complemento: event.target.value });
  };

  const handleChangePhone = (event: any) => {
    setPessoa({ ...pessoa, telefone: event.target.value });
  };

  const handleChangeEmail = (event: any) => {
    setPessoa({ ...pessoa, email: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault()
    fetch(`http://localhost:3001/pessoas`, {
      method: "POST",
      body: JSON.stringify(pessoa),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    router.push("/pessoas");
  };

  const handleCancelUpdate = () => {
    router.back();
  };

  return (
    <>
      {cidadeList && (
        <form onSubmit={handleSubmit} className="flex justify-center mt-7">
          <div className="grid gap-4 w-6/12">
          <div className="flex gap-5">
            <TextFieldCustom
              onChange={handleChangeName}
              required
              className="w-full"
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              defaultValue={pessoa?.nome}
            />
          </div>
          <div className="flex gap-5">
            <FormControl className="w-7/12">
              <InputLabel>Cidade</InputLabel>
              <Select
                required
                label="Cidade"
                value={pessoa?.cidade}
                onChange={handleChangeCity}
                sx={{
                  color: "#fff",
                  backgroundColor: '#1A2027',
                  "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
              >
                {cidadeList?.map((cidade: any) => (
                  <MenuItem sx={{color: "black"}} value={cidade}>{cidade.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {bairroList && <FormControl className="w-7/12">
              <InputLabel>Bairro</InputLabel>
              <Select
                required
                label="Bairro"
                value={pessoa?.bairro}
                onChange={handleChangeNeighborhood}
                sx={{
                  color: "#fff",
                  backgroundColor: '#1A2027',
                  "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
              >
                {bairroList.length < 1 && <MenuItem>Nenhum bairro encontrado</MenuItem>}
                {bairroList.map((bairro: any) => (
                  <MenuItem sx={{color: "black"}} value={bairro}>{bairro.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>}
            <TextFieldCustom
              required
              onChange={handleChangeCEP}
              label="CEP"
              variant="outlined"
              defaultValue={pessoa?.cep}
            />
          </div>
          <div className="flex gap-5">
            <TextFieldCustom
              required
              onChange={handleChangeAddress}
              className="w-5/12"
              id="outlined-basic"
              label="Endereço"
              variant="outlined"
              defaultValue={pessoa?.endereco}
            />
            <TextFieldCustom
              required
              onChange={handleChangeNumber}
              id="outlined-basic"
              label="Número"
              variant="outlined"
              defaultValue={pessoa?.numero}
            />
            <TextFieldCustom
              required
              onChange={handleChangeComplement}
              className="w-5/12"
              id="outlined-basic"
              label="Complemento"
              variant="outlined"
              defaultValue={pessoa?.complemento}
            />
          </div>
          <div className="flex gap-5">
            <TextFieldCustom
              required
              onChange={handleChangePhone}
              className="w-6/12"
              id="outlined-basic"
              label="Telefone"
              variant="outlined"
              defaultValue={pessoa?.telefone}
            />
            <TextFieldCustom
              required
              onChange={handleChangeEmail}
              className="w-6/12"
              id="outlined-basic"
              label="E-mail"
              variant="outlined"
              defaultValue={pessoa?.email}
            />
          </div>
          <div className="flex gap-5">
            <Button type="submit" variant="contained">
              Confirmar
            </Button>
            <Button
              onClick={handleCancelUpdate}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Pessoa criada com sucesso, redirecinando à lista de pessoas..."
          />
        </div>
        </form>
      )}
    </>
  );
}
