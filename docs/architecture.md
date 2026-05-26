# Architecture

Medical Device Playground is divided into two main parts:

- `DeviceSimulator.Api`: a .NET backend that simulates medical device data
- `dashboard`: a React frontend that displays the simulated data

The goal of this structure is to separate data generation from data visualization.

## High-level flow

```txt
DeviceSimulator.Api
        ↓
GET /vitals
        ↓
React Dashboard
        ↓
Patient data, device data, vital signs, alarms
```

## Backend

The backend is responsible for generating simulated monitoring data.

It exposes a `/vitals` endpoint that returns information such as:

- Patient data
- Device data
- Heart rate
- Oxygen saturation
- Blood pressure
- Temperature
- Alarm-related values

The backend also generates occasional abnormal values. This makes the dashboard more realistic without triggering alarms constantly.

## Frontend

The frontend is responsible for showing the simulated data in a clear dashboard.

It displays:

- Patient information
- Device information
- Current vital signs
- Active alarms
- Alarm history

The dashboard periodically requests new data from the backend and updates the interface.

## Data refresh

The frontend fetches new data at a regular interval.

This simulates a basic monitoring workflow where values change over time.

At the current stage, the frontend uses polling. This means it asks the backend for new data repeatedly instead of receiving updates automatically.

```txt
Frontend request
        ↓
Backend response
        ↓
Dashboard update
        ↓
Repeat after interval
```

## Alarm handling

The application checks incoming vital signs against predefined thresholds.

When a value is outside the expected range, the dashboard can show an alarm.

The alarm logic is intentionally simple for now. It is meant to show the basic idea of alarm detection, not to reproduce the full behavior of a real patient monitor.

To reduce noise, the simulator only generates abnormal values occasionally. The frontend also avoids adding the same alarm repeatedly to the alarm log.

## Current design decisions

| Decision | Reason |
|---|---|
| Separate backend and frontend | Keeps data simulation separate from visualization |
| Use polling | Simple to implement and easy to understand |
| Generate occasional abnormal values | Makes alarms possible without constant alarm spam |
| Separate patient/device data from vital signs | Makes the dashboard easier to read |
| Keep alarm logic simple | Helps focus on the basic monitoring concept |

## Current limitations

This project is still a learning simulation.

Current limitations include:

- No real medical device connection
- No persistent database
- No real patient data
- No authentication
- No clinical validation
- No advanced alarm prioritization
- No real-time protocol such as WebSockets yet

## Future architecture ideas

Possible improvements include:

- Replacing polling with WebSockets
- Adding multiple simulated devices
- Adding a database for alarm history
- Adding trend charts for vital signs
- Adding device connection status
- Adding HL7-style message simulation
- Adding clinical scenario presets

