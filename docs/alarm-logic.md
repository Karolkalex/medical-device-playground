# Alarm Logic

The dashboard includes basic alarm detection for simulated vital signs.

The goal is to show how a monitoring interface can react when a value moves outside an expected range.

!!! warning "Educational project"

    This alarm logic is only for simulation and learning purposes. It is not clinically validated and must not be used for patient care.

## How alarms work

The frontend receives simulated vital signs from the backend through the `/vitals` endpoint.

Each value is compared against the `normal` and `warning` ranges defined in the frontend configuration.

If a value is outside the expected range, the dashboard displays an alarm or warning state.

```txt
GET /vitals
    ↓
Receive simulated values
    ↓
Compare values against configured ranges
    ↓
Show status based on the value
    ↓
Add abnormal events to the alarm log
```

## Monitored values

The current simulated vital signs are:

| Vital sign | Field | Unit |
|---|---|---|
| Heart rate | `heartRate` | bpm |
| Oxygen saturation | `spo2` | % |
| Systolic blood pressure | `systolic` | mmHg |
| Diastolic blood pressure | `diastolic` | mmHg |
| Respiratory rate | `respiratoryRate` | rpm |
| Temperature | `temperature` | °C |

## Threshold configuration

The frontend uses two ranges for each vital sign:

- `normal`: values inside this range are displayed as normal
- `warning`: values outside the normal range, but still inside this wider range, are displayed as warning values

Values outside the warning range can be treated as more severe abnormal values.

| Vital sign | Field | Normal range | Warning range | Unit |
|---|---|---:|---:|---|
| Heart rate | `heartRate` | 60 to 100 | 50 to 120 | bpm |
| Oxygen saturation | `spo2` | 95 to 100 | 90 to 100 | % |
| Systolic blood pressure | `systolic` | 90 to 120 | 80 to 140 | mmHg |
| Diastolic blood pressure | `diastolic` | 60 to 80 | 50 to 95 | mmHg |
| Respiratory rate | `respiratoryRate` | 12 to 20 | 10 to 28 | rpm |
| Temperature | `temperature` | 36 to 37.5 | 35 to 38.5 | °C |

!!! note

    These thresholds are simplified for the project. Real clinical alarm limits depend on patient context, device configuration, clinical protocols, and monitoring goals.

## Status levels

The dashboard can classify each value based on its configured ranges.

| Status | Meaning |
|---|---|
| Normal | The value is inside the normal range |
| Warning | The value is outside the normal range but still inside the warning range |
| Critical | The value is outside the warning range |

This makes it possible to show different visual states in the dashboard instead of treating every abnormal value the same way.

## Abnormal value generation

The backend usually generates values within normal ranges.

Occasionally, it generates abnormal values to simulate clinical events.

This helps test how the frontend behaves when a vital sign crosses a configured threshold.

The purpose is to avoid constant alarms while still making the dashboard feel active and realistic.

## Alarm log behavior

When an abnormal value is detected, the frontend can add a new entry to the alarm log.

The alarm log is meant to show recent alarm events without duplicating the same alarm every second.

This helps reduce alarm spam and makes the history easier to read.

## Alarm fatigue

One of the ideas behind this feature is to show a simplified version of a real healthcare problem: alarm fatigue.

If a system generates too many alarms, users may start ignoring them.

In this project, abnormal values are generated occasionally so the dashboard can show alarms without triggering them constantly.

## Current limitations

The current alarm logic is intentionally simple.

Current limitations include:

- No configurable thresholds from the UI
- No patient-specific alarm limits
- No alarm acknowledgement
- No alarm silencing
- No persistent alarm history
- No distinction between technical and physiological alarms
- No clinical validation

## Future improvements

Possible improvements include:

| Feature | Description |
|---|---|
| Alarm severity | Add different priority levels for warning and critical values |
| Alarm acknowledgement | Allow the user to mark alarms as reviewed |
| Configurable thresholds | Let users adjust alarm limits |
| Technical alarms | Add device-related alarms, such as disconnected monitor |
| Alarm persistence | Store alarm history in a database or local storage |
| Trend-based alarms | Trigger alarms based on patterns, not only single values |
| Clinical scenarios | Add predefined cases with expected alarm behavior |