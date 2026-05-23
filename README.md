# Medical Device Playground

Experimental healthcare IT sandbox focused on medical device integration, telemetry, alarms, and interoperability.

## Overview

Medical Device Playground is a full-stack healthcare technology project built to simulate real-time patient monitoring systems and medical device integrations commonly found in hospital environments.

The project currently includes:

* ASP.NET Core backend API
* React monitoring dashboard
* Simulated patient telemetry
* Real-time vital sign updates
* Patient and device context
* Alarm severity classification
* Basic alarm event log
* Responsive monitor-style UI

The long-term goal is to expand the platform into a broader interoperability and healthcare integration playground, including HL7 messaging, FHIR APIs, waveform simulation, device states, and clinical workflow experimentation.

---

## Current Version

### v1.1

This version adds more clinical and integration context to the monitoring dashboard.

Main additions:

* Simulated patient information
* Simulated device information
* Alarm severity levels: normal, warning, critical
* Alarm summary panel
* Alarm event log with timestamps
* Improved dashboard layout

---

## Current Features

### Backend

* ASP.NET Core Web API
* Simulated patient telemetry endpoint
* Dynamic vital sign generation
* JSON-based API responses

### Frontend

* React + Vite dashboard
* Real-time telemetry polling / simulated updates
* Monitor-inspired UI
* Patient context display
* Device context display
* Vital sign status indicators
* Alarm severity classification
* Alarm event log
* Responsive layout

### Simulated Vitals

* Heart rate
* SpO₂
* Blood pressure
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