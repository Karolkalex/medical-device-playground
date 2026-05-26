# Setup

This page explains how to run Medical Device Playground locally.

## Requirements

Before running the project, make sure you have:

- .NET SDK
- Node.js
- npm
- Python
- pip

Python is only needed for the documentation site.

## Project structure

```txt
medical-device-playground/
│
├── DeviceSimulator.Api/        # .NET backend
├── dashboard/                  # React frontend
├── docs/                       # MkDocs documentation
├── mkdocs.yml                  # MkDocs configuration
├── requirements.txt            # Python documentation dependencies
└── MedicalDevicePlayground.sln
```

## Run the project locally

The project has two main parts:

- The backend API, located in `DeviceSimulator.Api`
- The frontend dashboard, located in `dashboard`

You need to run them in separate terminals.

## 1. Run the backend

Open a terminal in the project root:

```powershell
cd medical-device-playground
```

Then run:

```powershell
cd DeviceSimulator.Api
dotnet run
```

The backend starts the device simulator API.

It exposes an endpoint that returns simulated patient, device, and vital sign data.

## 2. Run the frontend

Open a second terminal in the project root:

```powershell
cd medical-device-playground
```

Then run:

```powershell
cd dashboard
npm install
npm run dev
```

The frontend starts a local development server.

Open the URL shown in the terminal. It is usually:

```txt
http://localhost:5173/
```

## Run the documentation site

The documentation uses MkDocs.

Open another terminal in the project root:

```powershell
cd medical-device-playground
```

Activate the Python virtual environment:

```powershell
.\.venv\Scripts\Activate.ps1
```

Then run:

```powershell
mkdocs serve
```

Open the local URL shown in the terminal. It is usually:

```txt
http://127.0.0.1:8000/
```

## Stop the local servers

To stop the backend, frontend, or documentation server, press:

```txt
Ctrl + C
```

in the terminal where it is running.

## Reinstall documentation dependencies

If you clone the project again or use another computer, recreate the Python environment with:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Then run the documentation site with:

```powershell
mkdocs serve
```

