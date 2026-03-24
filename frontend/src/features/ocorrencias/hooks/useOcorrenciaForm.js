import { useState } from "react";
import { createOcorrencia } from "../services/ocorrenciasService";
import {
    formatTelefone,
    toOcorrenciaPayload,
    validateOcorrenciaForm
} from "../utils/ocorrenciaFormRules";

const INITIAL_FORM = {
    nome_paciente: "",
    telefone: "",
    endereco: ""
};

const INITIAL_ERRORS = {
    nome_paciente: "",
    telefone: "",
    endereco: ""
};

export default function useOcorrenciaForm({ onCreated } = {}) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState(INITIAL_ERRORS);
    const [toast, setToast] = useState({ message: "", type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showToast = (message, type = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast({ message: "", type: "" });
        }, 3000);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const nextValue = name === "telefone" ? formatTelefone(value) : value;

        setForm((previous) => ({
            ...previous,
            [name]: nextValue
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: ""
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validateOcorrenciaForm(form);

        if (Object.values(nextErrors).some(Boolean)) {
            setErrors(nextErrors);
            showToast("Revise os campos destacados.", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const createdOcorrencia = await createOcorrencia(toOcorrenciaPayload(form));

            if (onCreated) {
                onCreated(createdOcorrencia);
            }

            showToast("Ocorrencia registrada com sucesso!", "success");
            setForm(INITIAL_FORM);
            setErrors(INITIAL_ERRORS);
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

            showToast("Erro ao registrar ocorrencia", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        errors,
        toast,
        isSubmitting,
        handleChange,
        handleSubmit
    };
}
