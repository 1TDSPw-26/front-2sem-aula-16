import { Link } from 'react-router';

export default function Menu() {
  return (
    <nav>
      <ul style={{listStyle: "none", padding: 0, margin: 0} }>
        <li style={{margin: "0 10px", display: "inline-block"}}><Link to="/">Home</Link></li>
        <li style={{margin: "0 10px", display: "inline-block"}}><Link to="/produtos">Produtos</Link></li>
        <li style={{margin: "0 10px", display: "inline-block"}}><Link to="/cad-produto">Cadastro de Produtos</Link></li>
      </ul>
    </nav>
  );
}