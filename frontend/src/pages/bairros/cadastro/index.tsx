import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import TextFieldCustom from "@/components/text-field-custom";

export default function BairroCreate() {
  const router = useRouter();
  const [bairro, setBairro] = useState<any>();
  const [cidadeList, setCidadeList] = useState<any[]>();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`http://localhost:3001/cidades`)
      .then((response) => response.json())
      .then((data) => setCidadeList(data));
  }, [router.isReady]);

  const handleChangeName = (event: any) => {
    setBairro({ ...bairro, nome: event.target.value });
  }

  const handleChangeCity = (event: any) => {
    setBairro({ ...bairro, cidade: event.target.value });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:3001/bairros`, {
      method: "POST",
      body: JSON.stringify(bairro),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    router.push("/bairros");
  };

  const handleCancelUpdate = () => {
    router.back();
  };

  return (
    <>
        <form onSubmit={handleSubmit} className="flex justify-center mt-7">
        <div className="grid gap-4 w-6/12">
          <div className="flex gap-5">
            <TextFieldCustom
              onChange={handleChangeName}
              required
              className="w-5/12"
              label="Nome"
              variant="outlined"
              defaultValue={bairro?.nome}
            />
            {cidadeList && <FormControl className="w-7/12">
              <InputLabel>Cidade</InputLabel>
              <Select
                required
                label="Cidade"
                value={bairro?.cidade}
                onChange={handleChangeCity}
                sx={{
                  color: "#fff",
                  backgroundColor: '#1A2027',
                  "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
              >
                {cidadeList.length < 1 && <MenuItem>Nenhuma cidade encontrado</MenuItem>}
                {cidadeList.map((cidade: any) => (
                  <MenuItem sx={{color: "black"}} value={cidade}>{cidade.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>}
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
        </div>
        </form>
      <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message="Bairro atualizado com sucesso, redirecionando à lista de bairros..."
          />
    </>
  );
}
