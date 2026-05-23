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
            <p className="eyebrow">Medical Device Playground</p>
            <h1>Patient Monitor</h1>
          </div>

          <div className="live-pill">
            <span></span>
            Live telemetry
          </div>
        </header>

        {!vitals ? (
          <p className="loading">Loading vitals...</p>
        ) : (
          <>
            <section className="patient-bar">
              <div>
                <span>Patient</span>
                <strong>{vitals.patientId}</strong>
              </div>

              <div>
                <span>Source</span>
                <strong>Simulated monitor</strong>
              </div>

              <div>
                <span>Last update</span>
                <strong>{new Date(vitals.timestamp).toLocaleTimeString()}</strong>
              </div>
            </section>

            <section className="vitals-grid">
              <VitalCard
                label="Heart Rate"
                value={vitals.heartRate}
                unit="bpm"
                status={getHeartRateStatus(vitals.heartRate)}
              />

              <VitalCard
                label="SpO₂"
                value={vitals.spo2}
                unit="%"
                status={getSpo2Status(vitals.spo2)}
              />

              <VitalCard
                label="Blood Pressure"
                value={`${vitals.systolic}/${vitals.diastolic}`}
                unit="mmHg"
                status={getBloodPressureStatus(vitals.systolic)}
              />
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function VitalCard({ label, value, unit, status }) {
  return (
    <article className={`vital-card ${status.className}`}>
      <div className="card-top">
        <p>{label}</p>
        <span>{status.text}</span>
      </div>

      <div className="vital-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
    </article>
  );
}

function getHeartRateStatus(value) {
  if (value > 100) return { text: "High", className: "warning" };
  if (value < 60) return { text: "Low", className: "warning" };
  return { text: "Normal", className: "normal" };
}

function getSpo2Status(value) {
  if (value < 92) return { text: "Critical", className: "critical" };
  if (value < 95) return { text: "Low", className: "warning" };
  return { text: "Normal", className: "normal" };
}

function getBloodPressureStatus(systolic) {
  if (systolic > 130) return { text: "High", className: "warning" };
  if (systolic < 90) return { text: "Low", className: "warning" };
  return { text: "Normal", className: "normal" };
}

export default App;