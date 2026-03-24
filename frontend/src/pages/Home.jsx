import OcorrenciaForm from "../components/OcorrenciaForm";
import OcorrenciaList from "../components/OcorrenciaList";

export default function Home() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Sistema de Ocorrências</h1>

            <OcorrenciaForm />
            <OcorrenciaList />
        </div>
    );
}