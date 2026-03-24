import { useState } from "react";
import api from "../services/api";

export default function OcorrenciaForm() {
    const [form, setForm] = useState({
        nome_paciente: "",
        telefone: "",
        endereco: ""
    });

    const [toast, setToast] = useState({
        message: "",
        type: ""
    });

    const showToast = (message, type = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast({ message: "", type: "" });
        }, 3000);
    };

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

            showToast("Ocorrência registrada com sucesso!", "success");

            setForm({
                nome_paciente: "",
                telefone: "",
                endereco: ""
            });

        } catch (error) {
            showToast("Erro ao registrar ocorrência", "error");
        }
    };

    return (
        <>
            {/* TOAST */}
            {toast.message && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}

            <form className="oc-form" onSubmit={handleSubmit}>
                <h2 className="oc-section-title">Nova Ocorrência</h2>

                <input
                    className="oc-input"
                    name="nome_paciente"
                    placeholder="Nome do paciente"
                    value={form.nome_paciente}
                    onChange={handleChange}
                    required
                />

                <input
                    className="oc-input"
                    name="telefone"
                    placeholder="Telefone / WhatsApp"
                    value={form.telefone}
                    onChange={handleChange}
                    required
                />

                <input
                    className="oc-input"
                    name="endereco"
                    placeholder="Endereço"
                    value={form.endereco}
                    onChange={handleChange}
                    required
                />

                <button className="oc-button" type="submit">
                    Registrar
                </button>
            </form>
        </>
    );
}