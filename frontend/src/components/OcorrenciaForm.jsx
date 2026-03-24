import { useState } from "react";
import api from "../services/api";

export default function OcorrenciaForm() {
    const [form, setForm] = useState({
        nome_paciente: "",
        telefone: "",
        endereco: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/ocorrencias", form);

            alert("Ocorrência registrada com sucesso!");

            setForm({
                nome_paciente: "",
                telefone: "",
                endereco: ""
            });

        } catch (error) {
            alert("Erro ao registrar ocorrência");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Nova Ocorrência</h2>

            <input
                name="nome_paciente"
                placeholder="Nome do paciente"
                value={form.nome_paciente}
                onChange={handleChange}
                required
            />

            <input
                name="telefone"
                placeholder="Telefone / WhatsApp"
                value={form.telefone}
                onChange={handleChange}
                required
            />

            <input
                name="endereco"
                placeholder="Endereço"
                value={form.endereco}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Registrar
            </button>
        </form>
    );
}