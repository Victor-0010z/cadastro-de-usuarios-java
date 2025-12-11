import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./cadastro.css";

export function Cadastro() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function enviar() {
        await api.post("", form);
        alert("Usuário cadastrado!");
        setForm({ name: "", email: "", password: "" });
        buscarUsuarios();
    }

    async function buscarUsuarios() {
        const res = await api.get("");
        setUsers(res.data);
    }

    async function deletar(id) {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        await api.delete(`/${id}`);
        buscarUsuarios();
    }

    function abrirEdicao(user) {
        setEditingUser(user);
    }

    function handleEditChange(e) {
        setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    }

    async function salvarEdicao() {
        const dados = {
            name: editingUser.name,
            email: editingUser.email
            };

            if (editingUser.password && editingUser.password.trim() !== "") {
            dados.password = editingUser.password;
            }

            await api.put(`/${editingUser.id}`, dados);

        setEditingUser(null);
        buscarUsuarios();
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div className="container">

        <h2>Cadastro de Usuários</h2>

        <div className="form-box">
            <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            />
            <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            />
            <input
            name="password"
            placeholder="Senha"
            type="password"
            value={form.password}
            onChange={handleChange}
            />
            <button onClick={enviar}>Cadastrar</button>
        </div>

        <h2 style={{ marginTop: "40px" }}>Usuários Cadastrados</h2>

        <table className="users-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {users.map((u) => (
                <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                    <button className="edit-btn" onClick={() => abrirEdicao(u)}>
                    Editar
                    </button>
                    <button className="delete-btn" onClick={() => deletar(u.id)}>
                    Excluir
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

    {editingUser && (
        <div className="modal">
        <div className="modal-content">
            <h3>Editar Usuário</h3>

            <input
                name="name"
                value={editingUser.name || ""}
                onChange={handleEditChange}
            />

            <input
                name="email"
                value={editingUser.email || ""}
                onChange={handleEditChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Nova senha (opcional)"
                value={editingUser.password || ""}
                onChange={handleEditChange}
            />

            <button className="save-btn" onClick={salvarEdicao}>
                Salvar
            </button>
            <button className="cancel-btn" onClick={() => setEditingUser(null)}>
                Cancelar
            </button>
        </div>
        </div>
    )}

    </div>
    );
}
