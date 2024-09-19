import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import TextFieldCustom from "@/components/text-field-custom";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "nome", headerName: "Nome", width: 200 },
  {
    field: "cidade",
    headerName: "Cidade",
    width: 130,
    valueGetter: (value, row) => `${row.cidade.nome}`,
  },
  { field: "telefone", headerName: "Telefone", width: 130 },
  { field: "actions", headerName: "Ações", width: 130 },
];

export default function Pessoa() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [pessoaList, setPessoaList] = useState([]);
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/pessoas")
      .then((response) => response.json())
      .then((data) => setPessoaList(data));
  }, []);

  const handleEditButton = (id: any) => router.push(`/pessoas/${id}`);

  const handleDeleteButton = async (id: any) => {
    resetSnackbars();
    await new Promise((f) => setTimeout(f, 500));
    const response = await fetch(`http://localhost:3001/pessoas/${id}`, {
      method: "DELETE",
    });
    if (response.status != 200) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenSnackbar(true);
      window.location.reload();
    }
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const resetSnackbars = () => {
    setOpenErrorSnackbar(false);
    setOpenSnackbar(false);
  };

  const handleCidade = (event: any) => {
    setCidade(event.target.value)
    handleFilter()
  };

  const handleNome = (event: any) => {
    setNome(event.target.value)
    handleFilter()
  };

  const handleBairro = (event: any) => {
    setBairro(event.target.value)
    handleFilter()
  };

  const handleFilter = () => {
    fetch(`http://localhost:3001/pessoas?nome=${nome}&cidade=${cidade}&bairro=${bairro}`)
      .then((response) => response.json())
      .then((data) => setPessoaList(data));
  };

  return (
    <div>
      <div className="flex justify-center gap-5 mt-6">
        <TextFieldCustom
          onChange={handleNome}
          className="w-2/12"
          label="Nome"
          variant="outlined"
        />
        <TextFieldCustom
          onChange={handleCidade}
          className="w-2/12"
          label="Cidade"
          variant="outlined"
        />
        <TextFieldCustom
          onChange={handleBairro}
          className="w-2/12"
          label="Bairro"
          variant="outlined"
        />
      </div>
      <div className="flex justify-center mt-7">
        <Paper sx={{ height: 400, width: "70%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column: any) => (
                  <TableCell sx={{ color: "black" }}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pessoaList.map((row: any) => (
                <TableRow>
                  <TableCell sx={{ color: "black" }}>{row.id}</TableCell>
                  <TableCell sx={{ color: "black" }}>{row.nome}</TableCell>
                  <TableCell sx={{ color: "black" }}>
                    {row.cidade.nome}
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>{row.telefone}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEditButton(row.id)}
                      aria-label="delete"
                    >
                      <EditIcon sx={{ color: "green" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteButton(row.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Pessoa excluída com sucesso"
        />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openErrorSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Não foi possível excluir esta pessoa"
        />
      </div>
    </div>
  );
}
