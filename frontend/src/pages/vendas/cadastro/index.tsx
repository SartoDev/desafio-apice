import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  SnackbarCloseReason,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TextFieldCustom from "@/components/text-field-custom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { DateField } from "@mui/x-date-pickers/DateField";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "nome", headerName: "Produto", width: 200 },
  { field: "quantidade", headerName: "Quantidade", width: 200 },
  { field: "valor", headerName: "Valor", width: 200 },
  { field: "valorTotal", headerName: "Total", width: 200 },
  { field: "actions", headerName: "Ações", width: 130 },
];

export default function VendaCreate() {
  const router = useRouter();
  const [venda, setVenda] = useState<any>();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [pessoaList, setPessoaList] = useState<any[]>();
  const [produtoList, setProdutoList] = useState<any[]>();
  const [vendaItemList, setVendaItemList] = useState<any[]>([]);
  const [produtoSelected, setProdutoSelected] = useState<any>({});
  const [valorTotalVenda, setValorTotalVenda] = useState(0);

  const handleChangeDate = (event: any) => {
    setVenda({ ...venda, dataVenda: event.target.value });
  };

  const handleChangePessoa = (event: any) => {
    setVenda({ ...venda, pessoa: event.target.value });
  };

  const handleChangeProduto = (event: any) => {
    setProdutoSelected({
      ...event.target.value,
      quantidade: 1,
      valor: parseFloat(event.target.value.valor),
      valorTotal: parseFloat((1 * event.target.value.valor).toFixed(2)),
    });
  };

  const handleChangeQuantidade = (event: any) => {
    setProdutoSelected({
      ...produtoSelected,
      quantidade: parseInt(event.target.value),
      valorTotal: parseFloat((event.target.value * produtoSelected?.valor).toFixed(2)),
    });
  };

  const handleChangeValor = (event: any) => {
    setProdutoSelected({
      ...produtoSelected,
      valor: parseFloat(event.target.value),
      valorTotal: parseFloat((event.target.value * produtoSelected?.quantidade).toFixed(2)),
    });
  };

  const handleAddVendaItem = (event: any) => {
    if (vendaItemList.findIndex(itemList => itemList.id == produtoSelected.id) > -1) {
      return;
    }
    setValorTotalVenda(
      parseFloat(
        (valorTotalVenda + parseFloat(produtoSelected?.valor)).toFixed(2)
      )
    );
    setVendaItemList([...vendaItemList, produtoSelected]);
  };

  const handleDeleteVendaItemButton = (event: any) => {
    const index = vendaItemList.findIndex(itemList => itemList.id == event)
    const newArray = [...vendaItemList.slice(0, index), ...vendaItemList.slice(index + 1)]
    setVendaItemList(newArray);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/pessoas`)
      .then((response) => response.json())
      .then((data) => setPessoaList(data));
    fetch(`http://localhost:3001/produtos`)
      .then((response) => response.json())
      .then((data) => setProdutoList(data));
  }, [router.isReady]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:3001/vendas`, {
      method: "POST",
      body: JSON.stringify({...venda, valor: valorTotalVenda, vendaItemList: vendaItemList}),
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
    router.push("/vendas");
  };

  const handleCancelUpdate = () => {
    router.back();
  };

  const getActualDate = () => {
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-7">
      <div className="grid gap-4 w-6/12">
        <div className="flex gap-5">
          <TextField
            onChange={handleChangeDate}
            required
            className="w-4/12"
            variant="outlined"
            defaultValue={getActualDate()}
            type="date"
            label="Data Venda"
            sx={{
              backgroundColor: "#1A2027",
            }}
          />
          <FormControl className="w-full">
            <InputLabel>Pessoa</InputLabel>
            <Select
              required
              label="Pessoa"
              value={venda?.pessoa}
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
        <div className="flex gap-5">
          <FormControl className="w-7/12">
            <InputLabel>Produto</InputLabel>
            <Select
              required
              label="Produto"
              onChange={handleChangeProduto}
              sx={{
                color: "#fff",
                backgroundColor: "#1A2027",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              {produtoList?.length! < 1 && (
                <MenuItem sx={{ color: "black" }}>
                  Nenhuma pessoa encontrada
                </MenuItem>
              )}
              {produtoList?.map((produto: any) => (
                <MenuItem sx={{ color: "black" }} value={produto}>
                  {produto.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextFieldCustom
            onChange={handleChangeQuantidade}
            required
            className="w-5/12"
            label="Quantidade"
            value={produtoSelected?.quantidade ?? 1}
          />
          <TextFieldCustom
            onChange={handleChangeValor}
            required
            className="w-5/12"
            label="Valor Unitário"
            defaultValue={0}
            value={produtoSelected?.valor}
          />
          <TextFieldCustom
            required
            className="w-5/12"
            label="Valor Total"
            variant="outlined"
            value={
              produtoSelected?.valor
                ? (
                    produtoSelected?.quantidade * produtoSelected?.valor
                  ).toFixed(2)
                : 0
            }
          />
          <IconButton
            onClick={handleAddVendaItem}
            sx={{ color: "white" }}
            aria-label="delete"
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
        <div>
          <Paper sx={{ height: 400, overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
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
                  {vendaItemList.map((row: any) => (
                    <TableRow>
                      <TableCell sx={{ color: "black" }}>{row.id}</TableCell>
                      <TableCell sx={{ color: "black" }}>{row.nome}</TableCell>
                      <TableCell sx={{ color: "black" }}>
                        {row.quantidade}
                      </TableCell>
                      <TableCell sx={{ color: "black" }}>{row.valor}</TableCell>
                      <TableCell sx={{ color: "black" }}>
                        {row.valorTotal}
                      </TableCell>
                      {
                        <TableCell>
                          <IconButton
                            onClick={() => handleDeleteVendaItemButton(row.id)}
                            aria-label="delete"
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>
                        </TableCell>
                      }
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
        <div className="flex h-9 justify-between">
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
          <TextFieldCustom
            required
            className="w-2/12"
            label="Total Venda"
            value={valorTotalVenda}
          />
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
