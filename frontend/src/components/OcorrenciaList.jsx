import useOcorrenciaList from "../features/ocorrencias/hooks/useOcorrenciaList";
import OcorrenciaTable from "../features/ocorrencias/components/OcorrenciaTable";

export default function OcorrenciaList({ refreshSignal = 0 }) {
    const {
        ocorrencias,
        open,
        isLoading,
        errorMessage,
        toggleOpen
    } = useOcorrenciaList(refreshSignal);

    return (
        <section className="oc-list-section">
            <button className="oc-button oc-button-secondary" onClick={toggleOpen}>
                {open ? "Ocultar ocorrências" : "Ver ocorrências"}
            </button>

            {open && (
                <OcorrenciaTable
                    ocorrencias={ocorrencias}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                />
            )}
        </section>
    );
}