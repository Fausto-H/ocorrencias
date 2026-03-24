import { useState } from "react";
import OcorrenciaForm from "../components/OcorrenciaForm";
import OcorrenciaList from "../components/OcorrenciaList";
import "./Home.css";

export default function Home() {
    const [refreshSignal, setRefreshSignal] = useState(0);

    const handleCreated = () => {
        setRefreshSignal((prev) => prev + 1);
    };

    return (
        <main className="home-page">
            <section className="home-card">
                <h1 className="home-title">Sistema de Ocorrências</h1>

                <OcorrenciaForm onCreated={handleCreated} />
                <OcorrenciaList refreshSignal={refreshSignal} />
            </section>
        </main>
    );
}