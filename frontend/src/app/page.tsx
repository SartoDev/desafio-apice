import CardComponent from "../../components/card";

export default function Home() {
  return (
    <div className="flex items-center justify-evenly mt-10">
      <CardComponent media="/cadastro-vetor.png" title="Cadastro" subtitle="Acesse o módulo de cadastro"/>
      <CardComponent media="/venda-vetor.png" title="Movimentação" subtitle="Acesse o módulo de movimentação"/>
      <CardComponent media="/relatorio-vetor.png" title="Relatório" subtitle="Acesse o módulo de relatório"/>
    </div>
  );
}
