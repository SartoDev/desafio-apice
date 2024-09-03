"use client"

import Image from "next/image";
import DropdowButton from "./dropdown-button";
import { MenuItem } from "@mui/material";

export default function Header() {

    const registerMenus = [
        <MenuItem>Bairros</MenuItem>,
        <MenuItem>Cidades</MenuItem>,
        <MenuItem>Pessoas</MenuItem>,
        <MenuItem>Produtos</MenuItem>
    ]
    const transferMenus = [<MenuItem>Vendas</MenuItem>]
    const reportsMenus = [
        <MenuItem>Lista de Pessoas</MenuItem>,
        <MenuItem>Lista de Vendas</MenuItem>
    ]

    return <div className="flex justify-evenly items-center">
        <div className="flex justify-evenly">
            <DropdowButton items={registerMenus} title="Cadastro" />
            <DropdowButton items={transferMenus} title="Movimento" />
            <DropdowButton items={reportsMenus} title="Relatórios" />
        </div>
        <div>
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/logo-apice.png"
                alt="Logo Apice"
                width={129}
                height={101}
                priority
            />
        </div>
    </div>
}