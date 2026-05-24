import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5086/vitals";

const PATIENT = {
  id: "P-001",
  name: "Simulated Patient",
  age: 54,
  location: "OR 3",
};

const DEVICE = {
  id: "MON-001",
  name: "Multiparameter Monitor",
  vendor: "Simulated Mindray",
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
  systolic: {
    label: "Systolic BP",
    unit: "mmHg",
    normal: [90, 120],
    warning: [80, 140],
  },
  diastolic: {
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

const INITIAL_VITALS = {
  heartRate: "--",
  spo2: "--",
  systolic: "--",
  diastolic: "--",
  respiratoryRate: "--",
  temperature: "--",
};

function getVitalStatus(value, config) {
  if (typeof value !== "number") {
    return "unknown";
  }

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
  if (!date) {
    return "--";
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function normalizeVitals(apiData) {
  return {
    heartRate: apiData.heartRate,
    spo2: apiData.spo2,
    systolic: apiData.systolic,
    diastolic: apiData.diastolic,
    respiratoryRate: apiData.respiratoryRate,
    temperature: apiData.temperature,
  };
}

function App() {
  const [vitals, setVitals] = useState(INITIAL_VITALS);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [alarmLog, setAlarmLog] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState("Connecting");
  const [error, setError] = useState("");

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

  const activeAlarms = vitalStatuses.filter(
    (vital) => vital.status === "warning" || vital.status === "critical"
  );

  async function fetchVitals() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      const newVitals = normalizeVitals(data);
      const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();

      const newAlarmEvents = Object.entries(newVitals)
        .map(([key, value]) => {
          const config = VITAL_CONFIG[key];
          const status = getVitalStatus(value, config);

          if (status === "normal" || status === "unknown") {
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
      setDeviceStatus("Connected");
      setError("");

      if (newAlarmEvents.length > 0) {
        setAlarmLog((previousLog) =>
          [...newAlarmEvents, ...previousLog].slice(0, 20)
        );
      }
    } catch (err) {
      setDeviceStatus("Disconnected");
      setError("Could not connect to telemetry API.");
      console.error(err);
    }
  }

  useEffect(() => {
  const initialFetch = setTimeout(() => {
    fetchVitals();
  }, 0);

  const interval = setInterval(() => {
    fetchVitals();
  }, 1000);

  return () => {
    clearTimeout(initialFetch);
    clearInterval(interval);
  };
}, []);

  return (
  <main className="app">
    <section className="hero">
      <div>
        <p className="eyebrow">Medical Device Playground</p>
        <h1>Simulated Patient Monitoring Dashboard</h1>
        <p className="subtitle">
          Real-time simulated telemetry from an ASP.NET Core backend API,
          with alarm severity classification and basic event traceability.
        </p>
      </div>

      <div className={`connection-card ${deviceStatus.toLowerCase()}`}>
        <span className="connection-dot" />
        <div>
          <strong>{deviceStatus}</strong>
          <p>Last update: {formatTime(lastUpdate)}</p>
        </div>
      </div>
    </section>

    {error && <p className="error-banner">{error}</p>}

    <section className="dashboard-section">
      <div className="section-header">
        <h2>Patient and Device Data</h2>
        <span>Simulation context</span>
      </div>

      <div className="context-grid">
        <article className="info-card">
          <h3>Patient</h3>
          <p>{PATIENT.name}</p>
          <span>ID: {PATIENT.id}</span>
          <span>Age: {PATIENT.age}</span>
          <span>Location: {PATIENT.location}</span>
        </article>

        <article className="info-card">
          <h3>Device</h3>
          <p>{DEVICE.name}</p>
          <span>ID: {DEVICE.id}</span>
          <span>Vendor: {DEVICE.vendor}</span>
          <span>Status: {deviceStatus}</span>
          <span>Last update: {formatTime(lastUpdate)}</span>
        </article>
      </div>
    </section>

    <section className="dashboard-section">
      <div className="section-header">
        <h2>Vital Signs</h2>
        <span>Live simulated measurements</span>
      </div>

      <section className="vitals-grid">
        {vitalStatuses.map((vital) => (
          <article key={vital.key} className={`vital-card ${vital.status}`}>
            <div className="vital-header">
              <h3>{vital.label}</h3>
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
    </section>

    <section className="dashboard-section">
      <div
        className={`alarm-summary-card ${
          activeAlarms.length > 0 ? "has-alarms" : ""
        }`}
      >
        <div>
          <h2>Alarm Summary</h2>
          <span>
            {activeAlarms.length === 0
              ? "No active alarms"
              : "Active alarm condition detected"}
          </span>
        </div>

        <p>{activeAlarms.length}</p>
      </div>
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