import OcorrenciaForm from "../components/OcorrenciaForm";
import OcorrenciaList from "../components/OcorrenciaList";
import "./Home.css";

export default function Home() {
    return (
        <main className="home-page">
            <section className="home-card">
                <h1 className="home-title">Sistema de Ocorrências</h1>

                <OcorrenciaForm />
                <OcorrenciaList />
            </section>
        </main>
    );
}