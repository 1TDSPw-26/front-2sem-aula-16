import { useState } from "react";
import { useNavigate } from "react-router";
import type { TipoProduto } from "../../types/types";


//Criar uma lista de produtos


export default function CadProduto() {

    document.title = "Cadastrar Produto"

  const navigate = useNavigate();

  //Através do destructuring, podemos acessar os dados do objeto e atribuir a variáveis
  //const { } = object

  //Recipiente onde irei guardar a lista de produtos
  const [produto, setProduto] = useState<TipoProduto>({
    id: "",
    nome: "",
    preco: 0,
    estoque: 0
  });


  const handleSubmit = async () => {
    try {

      const response = await fetch(`http://localhost:3001/produtos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (!response.ok) {
        throw new Error(`Ocorreu um erro no cadastro do produto: ${response.status} - ${response.statusText}`)
      }

      // Sucesso
      alert(`Produto cadastrado com sucesso.`)

      // Redirect
      navigate("/produtos")

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <main>
      <h2>Cadastrar Produtos</h2>
      <form>
        <fieldset>
          <legend>Dados do produto:</legend>
          <div>
            <label htmlFor="nome">Nome do produto: </label>
            <input type="text" name="nome" id="nome" value={produto.nome} onChange={(event) => setProduto({ ...produto, nome: event.target.value })} />
          </div>
          <div>
            <label htmlFor="preco">Preço do produto: </label>
            <input type="number" step={0.1} name="preco" id="preco" value={produto.preco} onChange={(event) => setProduto({ ...produto, preco: parseFloat(event.target.value) })} />
          </div>
          <div>
            <label htmlFor="estoque">Unidades em estoque: </label>
            <input type="number" step={1} name="estoque" id="estoque" value={produto.estoque} onChange={(event) => setProduto({ ...produto, estoque: parseInt(event.target.value) })} />
          </div>

          <div>
            <button type="button" onClick={handleSubmit}>Cadastrar</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}