# API

The backend exposes a simple API endpoint that returns simulated monitoring data.

At the current stage, the API is intentionally small. Its main purpose is to provide data for the React dashboard.

## Base URL

When running locally, the backend URL depends on the port shown by `dotnet run`.

It will usually look similar to:

```txt
http://localhost:5000
```

or:

```txt
https://localhost:7000
```

Check your backend terminal to confirm the exact URL.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/vitals` | Returns simulated patient and vital sign data |

## GET `/vitals`

Returns the latest simulated monitoring data.

The frontend calls this endpoint periodically to update the dashboard.

### Example request

```http
GET /vitals
```

### Example response

```json
{
  "patientId": "PAT-001",
  "heartRate": 80,
  "spo2": 97,
  "systolic": 116,
  "diastolic": 76,
  "respiratoryRate": 16,
  "temperature": 37,
  "timestamp": "2026-05-26T00:57:00.1455169Z"
}
```

## Response fields

| Field | Type | Description |
|---|---|---|
| `patientId` | `string` | Simulated patient identifier |
| `heartRate` | `number` | Heart rate in beats per minute |
| `spo2` | `number` | Oxygen saturation percentage |
| `systolic` | `number` | Systolic blood pressure in mmHg |
| `diastolic` | `number` | Diastolic blood pressure in mmHg |
| `respiratoryRate` | `number` | Respiratory rate in breaths per minute |
| `temperature` | `number` | Body temperature in °C |
| `timestamp` | `string` | Date and time when the simulated reading was generated, in UTC format |

## Data behavior

The backend generates simulated values every time the `/vitals` endpoint is called.

Most generated values are within normal ranges. Occasionally, the backend returns abnormal values to simulate clinical events.

This allows the frontend to test:

- Vital sign display
- Alarm detection
- Alarm history
- UI behavior during abnormal readings

## Current limitations

The API is still simple.

Current limitations include:

- No real device connection
- No persistent data storage
- No patient database
- No authentication
- No historical endpoint
- No streaming or WebSocket communication
- No clinical validation

## Future API ideas

Possible future endpoints include:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/device/status` | Returns simulated device connection status |
| `GET` | `/alarms` | Returns alarm history |
| `POST` | `/simulation/scenario` | Starts a predefined clinical simulation scenario |
| `GET` | `/vitals/history` | Returns historical vital sign values |