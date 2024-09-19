import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import TextFieldCustom from "@/components/text-field-custom";

export default function CidadeEdit() {
  const router = useRouter();
  const [cidade, setCidade] = useState<any>();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    fetch(`http://localhost:3001/cidades/${router.query.id}`)
      .then((response) => response.json())
      .then((data) => setCidade(data));
  }, [router.isReady]);

  const handleChangeName = (event: any) => {
    setCidade({ ...cidade, nome: event.target.value });
  }

  const handleChangeSiglaUF = (event: any) => {
    setCidade({ ...cidade, siglaUF: event.target.value });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    fetch(`http://localhost:3001/cidades/${router.query.id}`, {
      method: "PUT",
      body: JSON.stringify(cidade),
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
    router.back();
  };

  const handleCancelUpdate = () => {
    router.back();
  };

  return (
    <>
      {cidade && (
        <form onSubmit={handleSubmit} className="flex justify-center mt-7">
        <div className="grid gap-4 w-6/12">
          <div className="flex gap-5">
            <TextFieldCustom
              label="Código"
              variant="outlined"
              defaultValue={cidade?.id}
            />
            <TextFieldCustom
              onChange={handleChangeName}
              required
              className="w-5/12"
              label="Nome"
              variant="outlined"
              defaultValue={cidade?.nome}
            />
            <TextFieldCustom
              onChange={handleChangeSiglaUF}
              required
              className="w-5/12"
              label="Sigla UF"
              variant="outlined"
              defaultValue={cidade?.siglaUF}
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
            message="Cidade atualizada com sucesso, voltando à lista de cidades..."
          />
        </div>
        </form>
      )}
      {!cidade && <h1>Carregando informações</h1>}
    </>
  );
}
