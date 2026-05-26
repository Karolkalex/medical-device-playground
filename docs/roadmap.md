# Roadmap

This roadmap lists possible improvements for Medical Device Playground.

The project is still evolving, so the roadmap may change as new ideas are added or existing features are improved.

## Current version

The current version includes:

- Simulated vital signs from a .NET backend
- A React dashboard
- Patient information display
- Device information display
- Vital sign cards
- Basic alarm detection
- Alarm log
- Occasional abnormal values
- MkDocs documentation

## Short-term improvements

These are the next features that would make the current project more complete.

| Feature | Description |
|---|---|
| Trend charts | Show vital sign changes over time using simple line charts |
| Better timestamps | Display when each reading was generated or received |
| Alarm improvements | Improve how warning and critical values are shown |
| Device status | Add simulated device states, such as connected or disconnected |
| Better UI layout | Improve spacing, visual hierarchy, and responsive behavior |
| Documentation updates | Keep the docs aligned with the current API and frontend behavior |

## Medium-term improvements

These features would make the project feel closer to a real monitoring system simulation.

| Feature | Description |
|---|---|
| Multiple patients | Simulate more than one patient |
| Multiple devices | Simulate more than one monitor or device |
| Clinical scenarios | Add predefined scenarios, such as desaturation or tachycardia |
| Alarm acknowledgement | Allow users to mark alarms as reviewed |
| Alarm filtering | Filter the alarm log by vital sign or severity |
| Persistent alarm history | Store alarm events in local storage or a database |
| Configurable thresholds | Allow users to change alarm limits from the interface |

## Long-term ideas

These ideas are larger and would require more design and implementation work.

| Feature | Description |
|---|---|
| WebSocket support | Replace polling with real-time data updates |
| Historical data endpoint | Add an API endpoint for previous vital sign readings |
| Database support | Store readings, alarm history, and simulated sessions |
| HL7-style simulation | Generate simple healthcare interoperability messages |
| Device connection workflow | Simulate connection, disconnection, and communication errors |
| Export reports | Export alarm history or vital sign trends |
| Authentication | Add basic user access control for future expansion |

## Possible healthcare-focused features

These ideas connect the project more directly with biomedical engineering and healthcare IT concepts.

| Feature | Description |
|---|---|
| Technical alarms | Add alarms for device issues, such as sensor disconnected or monitor offline |
| Physiological alarms | Separate patient-related alarms from device-related alarms |
| Signal quality indicator | Simulate poor signal quality or missing measurements |
| Clinical notes | Allow users to add notes during simulated events |
| Scenario presets | Create cases like postoperative monitoring, hypoxia, fever, or hypotension |
| Integration page | Explain how this type of data could connect to an electronic health record |

## Documentation roadmap

The documentation should grow with the project.

Planned documentation pages include:

| Page | Purpose |
|---|---|
| Frontend | Explain React components, state, polling, and UI structure |
| Backend | Explain the .NET simulator and value generation logic |
| Alarm Logic | Keep alarm thresholds and behavior documented |
| API | Document current and future endpoints |
| Deployment | Explain possible deployment options |
| Changelog | Track changes between versions |

## Priority order

A possible next development order is:

1. Add trend charts for vital signs
2. Improve alarm severity display
3. Add device connection status
4. Add alarm acknowledgement
5. Add clinical scenario presets
6. Add WebSocket support
7. Add HL7-style message simulation

## Notes

This roadmap is not fixed.

The main goal is to keep the project useful as a learning space for medical device integration, patient monitoring concepts, and healthcare software development.

