import Link from 'next/link'
import Image from "next/image";
import { MenuItem } from "@mui/material";
import DropdowButton from './dropdown-button';

export default function Header() {

    const registerMenus = [
        <Link href="/bairros/cadastro"><MenuItem sx={{color: 'black'}}>Bairros</MenuItem></Link>,
        <Link href="/cidades/cadastro"><MenuItem sx={{color: 'black'}}>Cidades</MenuItem></Link>,
        <Link href="/pessoas/cadastro"><MenuItem sx={{color: 'black'}}>Pessoas</MenuItem></Link>,
        <Link href="/produtos/cadastro"><MenuItem sx={{color: 'black'}}>Produtos</MenuItem></Link>,
        <Link href="/vendas/cadastro"><MenuItem sx={{color: 'black'}}>Vendas</MenuItem></Link>
    ]
    const transferMenus = [
        <Link href="/bairros"><MenuItem sx={{color: 'black'}}>Bairros</MenuItem></Link>,
        <Link href="/cidades"><MenuItem sx={{color: 'black'}}>Cidades</MenuItem></Link>,
        <Link href="/pessoas"><MenuItem sx={{color: 'black'}}>Pessoas</MenuItem></Link>,
        <Link href="/produtos"><MenuItem sx={{color: 'black'}}>Produtos</MenuItem></Link>,
        <Link href="/vendas"><MenuItem sx={{color: 'black'}}>Vendas</MenuItem></Link>
    ]
    const reportsMenus = [
        <Link href=""><MenuItem sx={{color: 'black'}}>Lista de Pessoas</MenuItem></Link>,
        <Link href=""><MenuItem sx={{color: 'black'}}>Lista de Vendas</MenuItem></Link>,
    ]

    return <div className="flex justify-evenly items-center">
        <div className="flex justify-evenly">
            <DropdowButton items={registerMenus} title="Cadastro" />
            <DropdowButton items={transferMenus} title="Movimento" />
            {/* <DropdowButton items={reportsMenus} title="Relatórios" /> */}
        </div>
        <div>
            <Image
                src="/logo-apice.png"
                alt="Logo Apice"
                width={129}
                height={101}
                priority
            />
        </div>
    </div>
}