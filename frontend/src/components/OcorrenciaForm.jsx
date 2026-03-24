import { useState } from "react";
import api from "../services/api";

export default function OcorrenciaForm({ onCreated }) {
    const [form, setForm] = useState({
        nome_paciente: "",
        telefone: "",
        endereco: ""
    });

    const [errors, setErrors] = useState({
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

    const formatTelefone = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);

        if (digits.length <= 2) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        }

        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

    const validateForm = (currentForm) => {
        const nextErrors = {
            nome_paciente: "",
            telefone: "",
            endereco: ""
        };

        const nome = normalizeText(currentForm.nome_paciente);
        const telefoneDigits = currentForm.telefone.replace(/\D/g, "");
        const endereco = normalizeText(currentForm.endereco);

        if (!nome) {
            nextErrors.nome_paciente = "Informe o nome do paciente.";
        } else if (nome.length < 3) {
            nextErrors.nome_paciente = "O nome precisa ter pelo menos 3 caracteres.";
        } else if (nome.length > 120) {
            nextErrors.nome_paciente = "O nome pode ter no máximo 120 caracteres.";
        } else if (!/^[\p{L}\s'\-]+$/u.test(nome)) {
            nextErrors.nome_paciente = "Use apenas letras, espaços, hífen e apóstrofo. (Ex: João da Silva, Jean-Paul, O'Neill)";
        }

        if (!telefoneDigits) {
            nextErrors.telefone = "Informe o telefone com DDD.";
        } else if (!/^\d{10,11}$/.test(telefoneDigits)) {
            nextErrors.telefone = "O telefone deve ter 10 ou 11 dígitos. (Ex: (11) 91234-5678)";
        }

        if (!endereco) {
            nextErrors.endereco = "Informe o endereço.";
        } else if (endereco.length < 8) {
            nextErrors.endereco = "O endereço precisa no mínimo 8 caracteres. (Ex: Rua ABC, 123 - Bairro)";
        } else if (endereco.length > 255) {
            nextErrors.endereco = "O endereço pode ter no máximo 255 caracteres.";
        } else if (!/\d/.test(endereco)) {
            nextErrors.endereco = "Inclua o número no endereço.";
        }

        return nextErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nextValue = name === "telefone" ? formatTelefone(value) : value;

        setForm({
            ...form,
            [name]: nextValue
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextErrors = validateForm(form);

        if (Object.values(nextErrors).some(Boolean)) {
            setErrors(nextErrors);
            showToast("Revise os campos destacados.", "error");
            return;
        }

        const payload = {
            nome_paciente: normalizeText(form.nome_paciente),
            telefone: form.telefone.replace(/\D/g, ""),
            endereco: normalizeText(form.endereco)
        };

        try {
            const response = await api.post("/ocorrencias", payload);

            if (onCreated) {
                onCreated(response.data);
            }

            showToast("Ocorrência registrada com sucesso!", "success");

            setForm({
                nome_paciente: "",
                telefone: "",
                endereco: ""
            });

            setErrors({
                nome_paciente: "",
                telefone: "",
                endereco: ""
            });

        } catch (error) {
            const apiErrors = error?.response?.data?.errors;

            if (apiErrors) {
                setErrors({
                    nome_paciente: apiErrors.nome_paciente?.[0] || "",
                    telefone: apiErrors.telefone?.[0] || "",
                    endereco: apiErrors.endereco?.[0] || ""
                });
                showToast("Revise os campos destacados.", "error");
                return;
            }

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
                    className={`oc-input ${errors.nome_paciente ? "oc-input-invalid" : ""}`.trim()}
                    name="nome_paciente"
                    placeholder="Nome do paciente"
                    value={form.nome_paciente}
                    onChange={handleChange}
                    maxLength={120}
                    required
                />
                {errors.nome_paciente && <small className="oc-input-error">{errors.nome_paciente}</small>}

                <input
                    className={`oc-input ${errors.telefone ? "oc-input-invalid" : ""}`.trim()}
                    name="telefone"
                    placeholder="Telefone / WhatsApp"
                    value={form.telefone}
                    onChange={handleChange}
                    maxLength={15}
                    required
                />
                {errors.telefone && <small className="oc-input-error">{errors.telefone}</small>}

                <input
                    className={`oc-input ${errors.endereco ? "oc-input-invalid" : ""}`.trim()}
                    name="endereco"
                    placeholder="Endereço"
                    value={form.endereco}
                    onChange={handleChange}
                    maxLength={255}
                    required
                />
                {errors.endereco && <small className="oc-input-error">{errors.endereco}</small>}

                <button className="oc-button" type="submit">
                    Registrar
                </button>
            </form>
        </>
    );
}