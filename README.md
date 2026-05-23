# Medical Device Playground

Experimental healthcare IT sandbox focused on medical device integration, telemetry, and interoperability.

## Overview

Medical Device Playground is a full-stack healthcare technology project built to simulate real-time patient monitoring systems and medical device integrations commonly found in hospital environments.

The project currently includes:

* ASP.NET Core backend API
* React monitoring dashboard
* Simulated patient telemetry
* Real-time vital sign updates
* Responsive monitor-style UI

The long-term goal is to expand the platform into a broader interoperability and healthcare integration playground, including HL7 messaging, FHIR APIs, waveform simulation, device states, and clinical workflow experimentation.

---

## Current Features

### Backend

* ASP.NET Core Web API
* Simulated patient telemetry endpoint
* Dynamic vital sign generation
* JSON-based API responses

### Frontend

* React + Vite dashboard
* Real-time telemetry polling
* Monitor-inspired UI
* Vital sign status indicators
* Responsive layout

### Simulated Vitals

* Heart rate
* SpO₂
* Blood pressure
* Timestamped telemetry

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

---

## Running the Project

### Backend API

```bash
cd DeviceSimulator.Api
dotnet run
```

API available at:

```txt
http://localhost:5086
```

Telemetry endpoint:

```txt
http://localhost:5086/vitals
```

---

### Frontend Dashboard

```bash
cd dashboard
npm install
npm run dev
```

Dashboard available at:

```txt
http://localhost:5173
```

---

## Roadmap

Planned features include:

* Alarm states
* ECG waveform simulation
* Multi-patient monitoring
* SignalR real-time streaming
* HL7 ORU message generation
* FHIR interoperability experiments
* Device connection states
* Docker support
* Database integration
* Clinical workflow simulation

---

## Motivation

This project was created as a way to explore the intersection between:

* Biomedical engineering
* Healthcare IT
* Medical device integration
* Clinical interoperability
* Real-time systems

It is heavily inspired by real hospital environments and the challenges involved in connecting clinical devices, patient data, and healthcare workflows.

---

## License

MIT License
