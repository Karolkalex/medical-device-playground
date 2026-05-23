import { useEffect, useMemo, useState } from "react";
import "./App.css";

const PATIENT = {
  id: "P-001",
  name: "Simulated Patient",
  age: 54,
  location: "OR 3",
};

const DEVICE = {
  id: "MON-001",
  name: "Multiparametric Monitor",
  vendor: "Simulated Mindray",
  status: "Connected",
};

const VITAL_CONFIG = {
  heartRate: {
    label: "Heart Rate",
    unit: "bpm",
    normal: [60, 100],
    warning: [50, 120],
  },
  spo2: {
    label: "SpO₂",
    unit: "%",
    normal: [95, 100],
    warning: [90, 100],
  },
  systolicBP: {
    label: "Systolic BP",
    unit: "mmHg",
    normal: [90, 120],
    warning: [80, 140],
  },
  diastolicBP: {
    label: "Diastolic BP",
    unit: "mmHg",
    normal: [60, 80],
    warning: [50, 95],
  },
  respiratoryRate: {
    label: "Respiratory Rate",
    unit: "rpm",
    normal: [12, 20],
    warning: [10, 28],
  },
  temperature: {
    label: "Temperature",
    unit: "°C",
    normal: [36, 37.5],
    warning: [35, 38.5],
  },
};

function getRandomNumber(min, max, decimals = 0) {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function generateVitals() {
  return {
    heartRate: getRandomNumber(45, 145),
    spo2: getRandomNumber(82, 100),
    systolicBP: getRandomNumber(75, 160),
    diastolicBP: getRandomNumber(45, 105),
    respiratoryRate: getRandomNumber(8, 32),
    temperature: getRandomNumber(34.5, 39.5, 1),
  };
}

function getVitalStatus(value, config) {
  const [normalMin, normalMax] = config.normal;
  const [warningMin, warningMax] = config.warning;

  if (value >= normalMin && value <= normalMax) {
    return "normal";
  }

  if (value >= warningMin && value <= warningMax) {
    return "warning";
  }

  return "critical";
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function App() {
  const [vitals, setVitals] = useState(generateVitals());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [alarmLog, setAlarmLog] = useState([]);

  const vitalStatuses = useMemo(() => {
    return Object.entries(vitals).map(([key, value]) => {
      const config = VITAL_CONFIG[key];
      const status = getVitalStatus(value, config);

      return {
        key,
        value,
        status,
        ...config,
      };
    });
  }, [vitals]);

  const activeAlarms = vitalStatuses.filter((vital) => vital.status !== "normal");

  useEffect(() => {
    const interval = setInterval(() => {
      const newVitals = generateVitals();
      const timestamp = new Date();

      const newAlarmEvents = Object.entries(newVitals)
        .map(([key, value]) => {
          const config = VITAL_CONFIG[key];
          const status = getVitalStatus(value, config);

          if (status === "normal") {
            return null;
          }

          return {
            id: crypto.randomUUID(),
            time: formatTime(timestamp),
            vital: config.label,
            value,
            unit: config.unit,
            severity: status,
          };
        })
        .filter(Boolean);

      setVitals(newVitals);
      setLastUpdate(timestamp);

      if (newAlarmEvents.length > 0) {
        setAlarmLog((previousLog) =>
          [...newAlarmEvents, ...previousLog].slice(0, 20)
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">Medical Device Playground</p>
          <h1>Simulated Patient Monitoring Dashboard</h1>
          <p className="subtitle">
            Random vital signs, range-based alarms, severity classification, and
            basic event traceability.
          </p>
        </div>

        <div className="connection-card">
          <span className="connection-dot" />
          <div>
            <strong>{DEVICE.status}</strong>
            <p>Last update: {formatTime(lastUpdate)}</p>
          </div>
        </div>
      </section>

      <section className="context-grid">
        <article className="info-card">
          <h2>Patient</h2>
          <p>{PATIENT.name}</p>
          <span>ID: {PATIENT.id}</span>
          <span>Age: {PATIENT.age}</span>
          <span>Location: {PATIENT.location}</span>
        </article>

        <article className="info-card">
          <h2>Device</h2>
          <p>{DEVICE.name}</p>
          <span>ID: {DEVICE.id}</span>
          <span>Vendor: {DEVICE.vendor}</span>
          <span>Status: {DEVICE.status}</span>
        </article>

        <article className={`summary-card ${activeAlarms.length > 0 ? "has-alarms" : ""}`}>
          <h2>Alarm Summary</h2>
          <p>{activeAlarms.length}</p>
          <span>
            {activeAlarms.length === 0
              ? "No active alarms"
              : "Active alarm condition detected"}
          </span>
        </article>
      </section>

      <section className="vitals-grid">
        {vitalStatuses.map((vital) => (
          <article key={vital.key} className={`vital-card ${vital.status}`}>
            <div className="vital-header">
              <h2>{vital.label}</h2>
              <span className={`status-badge ${vital.status}`}>
                {vital.status}
              </span>
            </div>

            <p className="vital-value">
              {vital.value}
              <span>{vital.unit}</span>
            </p>

            <p className="range-text">
              Normal range: {vital.normal[0]} to {vital.normal[1]} {vital.unit}
            </p>
          </article>
        ))}
      </section>

      <section className="alarm-log">
        <div className="section-header">
          <h2>Alarm Log</h2>
          <span>Last 20 events</span>
        </div>

        {alarmLog.length === 0 ? (
          <p className="empty-log">No alarm events recorded yet.</p>
        ) : (
          <div className="log-list">
            {alarmLog.map((event) => (
              <article key={event.id} className={`log-item ${event.severity}`}>
                <span>{event.time}</span>
                <strong>{event.severity.toUpperCase()}</strong>
                <p>
                  {event.vital}: {event.value} {event.unit}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;