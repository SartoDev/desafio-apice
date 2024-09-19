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

export default function ProdutoCreate() {
  const router = useRouter();
  const [produto, setProduto] = useState<any>({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChangeName = (event: any) => {
    setProduto({ ...produto, nome: event.target.value });
  }

  const handleChangeValue = (event: any) => {
    setProduto({ ...produto, valor: parseFloat(event.target.value) });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    fetch(`http://localhost:3001/produtos`, {
      method: "POST",
      body: JSON.stringify(produto),
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
    router.push("/produtos");
  };

  const handleCancelUpdate = () => {
    router.back();
  };

  return (
      <form onSubmit={handleSubmit} className="flex justify-center mt-7">
        <div className="grid gap-4 w-6/12">
          <div className="flex gap-5">
            <TextFieldCustom
              onChange={handleChangeName}
              required
              className="w-5/12"
              label="Nome"
              variant="outlined"
              defaultValue={produto?.nome}
            />
            <TextFieldCustom
              onChange={handleChangeValue}
              required
              className="w-5/12"
              label="Valor"
              variant="outlined"
              defaultValue={produto?.valor}
              type="number"
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
            message="Produto cadastrado com sucesso, redirecionando à lista de produtos..."
          />
        </div>
        </form>
  );
}
