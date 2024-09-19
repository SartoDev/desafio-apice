import { GridColDef } from "@mui/x-data-grid";
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
  { field: "pessoa", headerName: "Pessoa", width: 200 },
  { field: "valor", headerName: "Total Venda", width: 200 },
  { field: "dataVenda", headerName: "Data da Venda", width: 200 },
  { field: "actions", headerName: "Ações", width: 130 }
];

export default function Venda() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [vendaList, setVendaList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/vendas")
      .then((response) => response.json())
      .then((data) => setVendaList(data));
  }, []);

  const handleEditButton = (id: any) => router.push(`/vendas/${id}`);

  const handleDeleteButton = async (id: any) => {
    resetSnackbars()
    await new Promise(f => setTimeout(f, 500));
    const response = await fetch(`http://localhost:3001/vendas/${id}`, {
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

  const formatDate = (date: any) => {
    var data = new Date(date),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
  }

  return (
    <div className="flex justify-center mt-7">
      <Paper sx={{ minHeight: 200, width: "70%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell sx={{color: "black"}}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vendaList.map((row: any) => (
              <TableRow>
                <TableCell sx={{color: "black"}}>{row.id}</TableCell>
                <TableCell sx={{color: "black"}}>{row.pessoa.nome}</TableCell>
                <TableCell sx={{color: "black"}}>{row.valor}</TableCell>
                <TableCell sx={{color: "black"}}>{formatDate(row.dataVenda)}</TableCell>
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
        message="Venda excluída com sucesso"
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Não foi possível excluir esta venda"
      />
    </div>
  );
}
