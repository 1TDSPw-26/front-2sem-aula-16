import { useEffect, useRef, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link, useNavigate } from "react-router";
import { FaRegEdit as Editar} from "react-icons/fa";
import { RiDeleteBinLine as Excluir} from "react-icons/ri";

export default function Produtos() {

    //Recipiente onde irei guardar a lista de produtos
    const [produtos, setProduto] = useState<TipoProduto[]>([]);

    useEffect(() => {

        const carregarProdutos = async () => {
            try {
                const resposta = await fetch("http://localhost:3001/produtos");

                if (!resposta.ok) {
                    throw new Error(`Erro no fetch da resposta dos produtos: ${resposta.status} - ${resposta.statusText}`);
                }

                const data: TipoProduto[] = await resposta.json();
                console.log(data);
                setProduto(data);

            } catch (error) {
                console.error(error);
            }

        }

        carregarProdutos();

    }, []);

    

    const navigate = useNavigate();
    const modalInfo = useRef<HTMLDialogElement>(null);
    const [idExclusao, setIdExclusão] = useState<string>("");
    const abrirModal = (id:string)=>{

        modalInfo.current?.showModal()
    }
    const handleDelete = async (id:string)=>{
        try{

            const response = await fetch('http://localhost:3001/produtos/${idExclusao}',
                {method: "DELETE"});

                if(!response.ok){
                    throw new Error('Ocorreu um erro na exclusão do produto: ${response.status} - ${response.statusText}');
                
                }
                
                alert("Produto excluido com sucesso!");
                navigate("/produtos");

            
        }catch (error) {
                console.error(error);
            }

    }

    return (
        <main>

            <h2>Produtos</h2>

            <dialog className="msgDelete" ref={modalInfo}>
                <h3>Exclusão de produto</h3>
                <div>
                    <p>Deseja realmente excluir esse produto?</p>
                    <button onClick={()=> modalInfo.current?.close()}>Cancelar</button>
                    <button onClick={()=> handleDelete} className="bg-red-600">Sim - Excluir </button>
                </div>

            </dialog>

            <table border={1} style={{ width: "100%", borderCollapse: "collapse", borderColor: "#ff0000" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>PREÇO</th>
                        <th>ESTOQUE</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p) => (

                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>{p.preco}</td>
                            <td>{p.estoque}</td>
                            <td>
                                <Link to={`/CadProduto/${p.id}`}> <Editar /> </Link>  |
                                <Link to="#" onClick={() => abrirModal(p.id)}> <Excluir /> </Link>  |
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>Quantidade de Produtos: {produtos.length}</td>
                    </tr>
                </tfoot>
            </table>
        </main>
    )
}
