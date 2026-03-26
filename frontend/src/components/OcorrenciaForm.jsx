import React from "react";
import useOcorrenciaForm from "../features/ocorrencias/hooks/useOcorrenciaForm";
import OcorrenciaFormField from "../features/ocorrencias/components/OcorrenciaFormField";

export default function OcorrenciaForm({ onCreated }) {
    const {
        form,
        errors,
        toast,
        isSubmitting,
        handleChange,
        handleSubmit
    } = useOcorrenciaForm({ onCreated });

    return (
        <>
            {/* TOAST */}
            {toast.message && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}

            <form className="oc-form" onSubmit={handleSubmit}>
                <h2 className="oc-section-title">Registrar Nova Ocorrência</h2>

                <OcorrenciaFormField
                    name="nome_paciente"
                    placeholder="Nome do paciente"
                    value={form.nome_paciente}
                    onChange={handleChange}
                    error={errors.nome_paciente}
                    maxLength={120}
                />

                <OcorrenciaFormField
                    name="telefone"
                    placeholder="Telefone / WhatsApp"
                    value={form.telefone}
                    onChange={handleChange}
                    error={errors.telefone}
                    maxLength={15}
                />

                <OcorrenciaFormField
                    name="endereco"
                    placeholder="Endereço"
                    value={form.endereco}
                    onChange={handleChange}
                    error={errors.endereco}
                    maxLength={255}
                />

                <button className="oc-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registrando..." : "REGISTRAR"}
                </button>
            </form>
        </>
    );
}