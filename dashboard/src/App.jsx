import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [vitals, setVitals] = useState(null);

  async function fetchVitals() {
    try {
      const response = await fetch("http://localhost:5086/vitals");
      const data = await response.json();
      setVitals(data);
    } catch (error) {
      console.error("Error fetching vitals:", error);
    }
  }

useEffect(() => {
  const timeout = setTimeout(() => {
    fetchVitals();
  }, 0);

  const interval = setInterval(() => {
    fetchVitals();
  }, 1000);

  return () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };
}, []);

  return (
    <main className="dashboard">
      <section className="monitor">
        <header className="monitor-header">
          <div>
            <p className="eyebrow">Device Simulator</p>
            <h1>Patient Monitor</h1>
          </div>

          <div className="status">
            <span className="status-dot"></span>
            Live
          </div>
        </header>

        {!vitals ? (
          <p className="loading">Loading vitals...</p>
        ) : (
          <>
            <section className="patient-strip">
              <div>
                <span>Patient ID</span>
                <strong>{vitals.patientId}</strong>
              </div>

              <div>
                <span>Last update</span>
                <strong>
                  {new Date(vitals.timestamp).toLocaleTimeString()}
                </strong>
              </div>
            </section>

            <section className="vitals-grid">
              <VitalCard
                label="Heart Rate"
                value={vitals.heartRate}
                unit="bpm"
                range="Normal range: 60-100"
              />

              <VitalCard
                label="SpO₂"
                value={vitals.spo2}
                unit="%"
                range="Expected: ≥ 95"
              />

              <VitalCard
                label="Blood Pressure"
                value={`${vitals.systolic}/${vitals.diastolic}`}
                unit="mmHg"
                range="Reference: around 120/80"
              />
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function VitalCard({ label, value, unit, range }) {
  return (
    <article className="vital-card">
      <p>{label}</p>

      <div className="vital-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>

      <small>{range}</small>
    </article>
  );
}

export default App;