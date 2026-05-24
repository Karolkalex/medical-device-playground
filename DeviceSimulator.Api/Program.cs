using DeviceSimulator.Api.Models;

var currentHeartRate = 78;
var currentSpo2 = 98;
var currentSystolic = 118;
var currentDiastolic = 75;
var currentRespiratoryRate = 16;
var currentTemperature = 37.1;

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
    currentHeartRate = GenerateSmoothOccasionalAbnormalValue(
        currentHeartRate,
        normalMin: 65,
        normalMax: 100,
        abnormalLowMin: 45,
        abnormalLowMax: 59,
        abnormalHighMin: 101,
        abnormalHighMax: 135,
        maxStep: 2
    );

    currentSpo2 = GenerateSmoothOccasionalAbnormalValue(
        currentSpo2,
        normalMin: 95,
        normalMax: 100,
        abnormalLowMin: 88,
        abnormalLowMax: 94,
        abnormalHighMin: 95,
        abnormalHighMax: 100,
        maxStep: 1
    );

    currentSystolic = GenerateSmoothOccasionalAbnormalValue(
        currentSystolic,
        normalMin: 105,
        normalMax: 125,
        abnormalLowMin: 80,
        abnormalLowMax: 94,
        abnormalHighMin: 131,
        abnormalHighMax: 155,
        maxStep: 2
    );

    currentDiastolic = GenerateSmoothOccasionalAbnormalValue(
        currentDiastolic,
        normalMin: 65,
        normalMax: 85,
        abnormalLowMin: 45,
        abnormalLowMax: 59,
        abnormalHighMin: 91,
        abnormalHighMax: 105,
        maxStep: 2
    );

    currentRespiratoryRate = GenerateSmoothOccasionalAbnormalValue(
        currentRespiratoryRate,
        normalMin: 12,
        normalMax: 20,
        abnormalLowMin: 8,
        abnormalLowMax: 11,
        abnormalHighMin: 21,
        abnormalHighMax: 32,
        maxStep: 1
    );

    currentTemperature = GenerateSmoothOccasionalAbnormalTemperature(currentTemperature);

    return new VitalSigns
    {
        PatientId = "PAT-001",
        HeartRate = currentHeartRate,
        Spo2 = currentSpo2,
        Systolic = currentSystolic,
        Diastolic = currentDiastolic,
        RespiratoryRate = currentRespiratoryRate,
        Temperature = currentTemperature,
        Timestamp = DateTime.UtcNow
    };
});


static int GenerateSmoothOccasionalAbnormalValue(
    int currentValue,
    int normalMin,
    int normalMax,
    int abnormalLowMin,
    int abnormalLowMax,
    int abnormalHighMin,
    int abnormalHighMax,
    int maxStep = 2)
{
    var roll = Random.Shared.Next(1, 1001);

    int targetValue;

    if (roll <= 995)
    {
        targetValue = Random.Shared.Next(normalMin, normalMax + 1);
    }
    else if (roll <= 997)
    {
        targetValue = Random.Shared.Next(abnormalLowMin, abnormalLowMax + 1);
    }
    else
    {
        targetValue = Random.Shared.Next(abnormalHighMin, abnormalHighMax + 1);
    }

    if (targetValue > currentValue)
    {
        return Math.Min(currentValue + Random.Shared.Next(1, maxStep + 1), targetValue);
    }

    if (targetValue < currentValue)
    {
        return Math.Max(currentValue - Random.Shared.Next(1, maxStep + 1), targetValue);
    }

    return currentValue;
}


static double GenerateSmoothOccasionalAbnormalTemperature(double currentValue)
{
    var roll = Random.Shared.Next(1, 1001);

    double targetValue;

    if (roll <= 995)
    {
        targetValue = 36.0 + Random.Shared.NextDouble() * 1.5; // 36.0 to 37.5
    }
    else if (roll <= 997)
    {
        targetValue = 34.5 + Random.Shared.NextDouble() * 0.5; // 34.5 to 35.0
    }
    else
    {
        targetValue = 38.0 + Random.Shared.NextDouble() * 1.0; // 38.0 to 39.0
    }

    const double maxStep = 0.1;

    if (targetValue > currentValue)
    {
        currentValue = Math.Min(currentValue + maxStep, targetValue);
    }
    else if (targetValue < currentValue)
    {
        currentValue = Math.Max(currentValue - maxStep, targetValue);
    }

    return Math.Round(currentValue, 1);
}


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

static int GenerateSmoothValue(
    int currentValue,
    int normalMin,
    int normalMax,
    int abnormalLowMin,
    int abnormalLowMax,
    int abnormalHighMin,
    int abnormalHighMax)
{
    var roll = Random.Shared.Next(1, 101);

    int targetValue;

    if (roll <= 96)
    {
        targetValue = Random.Shared.Next(normalMin, normalMax + 1);
    }
    else if (roll <= 98)
    {
        targetValue = Random.Shared.Next(abnormalLowMin, abnormalLowMax + 1);
    }
    else
    {
        targetValue = Random.Shared.Next(abnormalHighMin, abnormalHighMax + 1);
    }

    var maxStep = 3;

    if (targetValue > currentValue)
    {
        return Math.Min(currentValue + Random.Shared.Next(1, maxStep + 1), targetValue);
    }

    if (targetValue < currentValue)
    {
        return Math.Max(currentValue - Random.Shared.Next(1, maxStep + 1), targetValue);
    }

    return currentValue;
}

app.Run();