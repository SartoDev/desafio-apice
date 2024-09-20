import { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  SnackbarCloseReason,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import PrintIcon from "@mui/icons-material/Print";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "pessoa", headerName: "Pessoa", width: 200 },
  { field: "valor", headerName: "Total Venda", width: 200 },
  { field: "dataVenda", headerName: "Data da Venda", width: 200 },
  { field: "actions", headerName: "Ações", width: 130 },
];

export default function Venda() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [vendaList, setVendaList] = useState([]);
  const [pessoaList, setPessoaList] = useState([]);
  const [produtoList, setProdutoList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/vendas")
      .then((response) => response.json())
      .then((data) => setVendaList(data));
    fetch("http://localhost:3001/pessoas")
      .then((response) => response.json())
      .then((data) => setPessoaList(data));
  }, []);

  const handleEditButton = (id: any) => router.push(`/vendas/${id}`);

  const handleDeleteButton = async (id: any) => {
    resetSnackbars();
    await new Promise((f) => setTimeout(f, 500));
    const response = await fetch(`http://localhost:3001/vendas/${id}`, {
      method: "DELETE",
    });
    if (response.status != 200) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenSnackbar(true);
      window.location.reload();
    }
  };

  const resetSnackbars = () => {
    setOpenErrorSnackbar(false);
    setOpenSnackbar(false);
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

  const formatDate = (date: any) => {
    var data = new Date(date),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  };

  const handleChangePessoa = (event: any) => {
    fetch(`http://localhost:3001/vendas?pessoa=${event.target.value.nome}`)
      .then((response) => response.json())
      .then((data) => setVendaList(data));
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    text: {
      paddingLeft: 30,
    },
    item: {
      paddingLeft: 70,
    },
    view: {
      flexDirection: "row",
      marginTop: 60,
    },
    viewItens: {
      flexDirection: "row",
      marginTop: 10,
    },
    ass: {
      marginTop: 400,
      flexDirection: "row",
    },
    assText: {
      paddingRight: 300,
    }
  });

  const handlePrintButton = async (row: any) => {
    const response = await fetch(
      `http://localhost:3001/venda-itens?vendaId=${row.id}`
    );
    const data = await response.json();
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Data da Venda: {formatDate(row.dataVenda)}</Text>
            <Text>Cliente: {row.pessoa.nome}</Text>
            <View style={styles.view}>
              <Text>Nome</Text>
              <Text style={styles.text}>Quantidade</Text>
              <Text style={styles.text}>Valor</Text>
              <Text style={styles.text}>Valor Total</Text>
            </View>
            {data.map((item: any) => (
              <View style={styles.viewItens}>
                <Text>{item.produto.nome}</Text>
                <Text style={styles.item}>{item.quantidade}</Text>
                <Text style={styles.item}>{item.produto.valor}</Text>
                <Text style={styles.item}>
                  {item.quantidade * item.produto.valor}
                </Text>
              </View>
            ))}
            <View style={styles.ass}>
              <Text style={styles.assText}>Ass:</Text>
              <Text>Total da venda: R${row.valor}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
    const file = await pdf(MyDocument).toBlob();
    saveAs(file, `relatorio-venda-${row.id}`);
  };

  return (
    <div>
      <div className="flex justify-center gap-5 mt-6">
        <FormControl className="w-2/12">
          <InputLabel>Pessoa</InputLabel>
          <Select
            required
            label="Pessoa"
            onChange={handleChangePessoa}
            sx={{
              color: "#fff",
              backgroundColor: "#1A2027",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            {pessoaList?.length! < 1 && (
              <MenuItem sx={{ color: "black" }}>
                Nenhuma pessoa encontrada
              </MenuItem>
            )}
            {pessoaList?.map((pessoa: any) => (
              <MenuItem sx={{ color: "black" }} value={pessoa}>
                {pessoa.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex justify-center mt-7">
        <Paper sx={{ height: 400, width: "70%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }}>
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
                {vendaList.map((row: any, index: any) => (
                  <TableRow>
                    <TableCell sx={{ color: "black" }}>{row.id}</TableCell>
                    <TableCell sx={{ color: "black" }}>
                      {row.pessoa.nome}
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>{row.valor}</TableCell>
                    <TableCell sx={{ color: "black" }}>
                      {formatDate(row.dataVenda)}
                    </TableCell>
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
                      <IconButton
                        onClick={(e) => handlePrintButton(row)}
                        aria-label="delete"
                      >
                        <PrintIcon sx={{ color: "blue" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
    </div>
  );
}
