# Medical Device Playground

Experimental healthcare IT sandbox focused on medical device integration, telemetry, alarms, and interoperability.

## Overview

Medical Device Playground is a full-stack healthcare technology project built to simulate real-time patient monitoring systems and medical device integrations commonly found in hospital environments.

The project currently includes:

* ASP.NET Core backend API serving simulated telemetry
* React monitoring dashboard consuming backend data
* Simulated patient telemetry
* Real-time vital sign polling
* Patient and device context
* Alarm severity classification
* Basic alarm event log
* Responsive monitor-style UI

The long-term goal is to expand the platform into a broader interoperability and healthcare integration playground, including HL7 messaging, FHIR APIs, waveform simulation, device states, and clinical workflow experimentation.

---

## Current Version

### v1.2

This version connects the React dashboard to the ASP.NET Core backend API.

Main additions:

* Frontend telemetry polling from the `/vitals` endpoint
* Backend-generated simulated vital signs
* Patient telemetry returned as JSON
* Respiratory rate and temperature added to the backend model
* Dashboard alarm logic based on API data
* Device connection status based on API availability

---

## Current Features

### Backend

* ASP.NET Core Web API
* Simulated patient telemetry endpoint
* Dynamic vital sign generation
* Occasional abnormal value generation
* JSON-based API responses
* Basic CORS configuration for local frontend access

### Frontend

* React + Vite dashboard
* Telemetry polling from the backend API
* Monitor-inspired UI
* Patient context display
* Device context display
* Vital sign status indicators
* Alarm severity classification
* Alarm event log
* Device connection status display
* Responsive layout

### Simulated Vitals

* Heart rate
* SpO₂
* Systolic blood pressure
* Diastolic blood pressure
* Respiratory rate
* Temperature
* Timestamped telemetry

### Alarm Logic

The dashboard classifies vital signs using basic predefined ranges.

Alarm states include:

* Normal
* Warning
* Critical

The app also stores recent alarm events in a basic log to simulate clinical event traceability.

---

## Roadmap

Planned features include:

* Vital sign trend charts
* ECG waveform simulation
* Multi-patient monitoring
* Simulated device connection states
* SignalR real-time streaming
* Exportable alarm logs
* HL7 ORU message generation
* FHIR Observation examples
* FHIR interoperability experiments
* Docker support
* Database integration
* Clinical workflow simulation

---

## Tech Stack

### Backend

* C#
* ASP.NET Core (.NET 9)

### Frontend

* React
* Vite
* JavaScript
* CSS

### Tooling

* Git
* GitHub

---

## Project Structure

```txt
medical-device-playground/
│
├── DeviceSimulator.Api/
│
├── dashboard/
│
└── MedicalDevicePlayground.sln
```
