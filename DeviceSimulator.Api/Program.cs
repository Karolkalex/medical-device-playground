using DeviceSimulator.Api.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Device Simulator API is running.");

app.MapGet("/vitals", () =>
{
    var heartRate = GenerateOccasionalAbnormalValue(
        normalMin: 65,
        normalMax: 100,
        abnormalLowMin: 45,
        abnormalLowMax: 59,
        abnormalHighMin: 101,
        abnormalHighMax: 135
    );

    var spo2 = GenerateOccasionalAbnormalValue(
        normalMin: 95,
        normalMax: 100,
        abnormalLowMin: 88,
        abnormalLowMax: 94,
        abnormalHighMin: 95,
        abnormalHighMax: 100
    );

    var systolic = GenerateOccasionalAbnormalValue(
        normalMin: 105,
        normalMax: 125,
        abnormalLowMin: 80,
        abnormalLowMax: 94,
        abnormalHighMin: 131,
        abnormalHighMax: 155
    );

    var diastolic = GenerateOccasionalAbnormalValue(
        normalMin: 65,
        normalMax: 85,
        abnormalLowMin: 45,
        abnormalLowMax: 59,
        abnormalHighMin: 91,
        abnormalHighMax: 105
    );

    var respiratoryRate = GenerateOccasionalAbnormalValue(
        normalMin: 12,
        normalMax: 20,
        abnormalLowMin: 8,
        abnormalLowMax: 11,
        abnormalHighMin: 21,
        abnormalHighMax: 32
    );

    var temperature = GenerateOccasionalAbnormalTemperature();

    return new VitalSigns
    {
        PatientId = "PAT-001",
        HeartRate = heartRate,
        Spo2 = spo2,
        Systolic = systolic,
        Diastolic = diastolic,
        RespiratoryRate = respiratoryRate,
        Temperature = temperature,
        Timestamp = DateTime.UtcNow
    };
});

static double GenerateOccasionalAbnormalTemperature()
{
    var shouldGenerateAbnormal = Random.Shared.NextDouble() < 0.25;

    if (!shouldGenerateAbnormal)
    {
        return Math.Round(36.0 + Random.Shared.NextDouble() * 1.5, 1);
    }

    var shouldGenerateLow = Random.Shared.Next(0, 2) == 0;

    if (shouldGenerateLow)
    {
        return Math.Round(34.5 + Random.Shared.NextDouble() * 1.4, 1);
    }

    return Math.Round(37.6 + Random.Shared.NextDouble() * 1.9, 1);
}

static int GenerateOccasionalAbnormalValue(
    int normalMin,
    int normalMax,
    int abnormalLowMin,
    int abnormalLowMax,
    int abnormalHighMin,
    int abnormalHighMax)
{
    var roll = Random.Shared.Next(1, 101);

    if (roll <= 95)
    {
        return Random.Shared.Next(normalMin, normalMax + 1);
    }

    if (roll <= 97)
    {
        return Random.Shared.Next(abnormalLowMin, abnormalLowMax + 1);
    }

    return Random.Shared.Next(abnormalHighMin, abnormalHighMax + 1);
}

app.Run();