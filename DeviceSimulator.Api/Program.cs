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

    var diastolic = Random.Shared.Next(65, 90);

    return new VitalSigns
    {
        PatientId = "PAT-001",
        HeartRate = heartRate,
        Spo2 = spo2,
        Systolic = systolic,
        Diastolic = diastolic,
        Timestamp = DateTime.UtcNow
    };
});

static int GenerateOccasionalAbnormalValue(
    int normalMin,
    int normalMax,
    int abnormalLowMin,
    int abnormalLowMax,
    int abnormalHighMin,
    int abnormalHighMax)
{
    var roll = Random.Shared.Next(1, 101);

    if (roll <= 75)
    {
        return Random.Shared.Next(normalMin, normalMax + 1);
    }

    if (roll <= 88)
    {
        return Random.Shared.Next(abnormalLowMin, abnormalLowMax + 1);
    }

    return Random.Shared.Next(abnormalHighMin, abnormalHighMax + 1);
}

app.Run();