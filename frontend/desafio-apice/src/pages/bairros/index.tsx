import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
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

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "nome", headerName: "Nome", width: 200 },
  { field: "cidade", headerName: "Cidade", width: 200 },
  { field: "actions", headerName: "Ações", width: 130 }
];

export default function Cidade() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [bairroList, setBairroList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/bairros")
      .then((response) => response.json())
      .then((data) => setBairroList(data));
  }, []);

  const handleEditButton = (id: any) => router.push(`/bairros/${id}`);

  const handleDeleteButton = async (id: any) => {
    resetSnackbars()
    await new Promise(f => setTimeout(f, 500));
    const response = await fetch(`http://localhost:3001/bairros/${id}`, {
      method: "DELETE",
    });
    if (response.status != 200) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenSnackbar(true);
      window.location.reload();
    }
  }

  const resetSnackbars = () => {
    setOpenErrorSnackbar(false)
    setOpenSnackbar(false)
  }

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

  return (
    <div className="flex justify-center mt-7">
      <Paper sx={{ height: 400, width: "70%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell sx={{color: "black"}}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bairroList.map((row: any) => (
              <TableRow>
                <TableCell sx={{color: "black"}}>{row.id}</TableCell>
                <TableCell sx={{color: "black"}}>{row.nome}</TableCell>
                <TableCell sx={{color: "black"}}>{row.cidade.nome}</TableCell>
                <TableCell sx={{color: "black"}}>
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
        message="Bairro excluído com sucesso"
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Não foi possível excluir este bairro"
      />
    </div>
  );
}
