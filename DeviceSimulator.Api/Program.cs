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
    return new VitalSigns
    {
        PatientId = "PAT-001",
        HeartRate = Random.Shared.Next(60, 110),
        Spo2 = Random.Shared.Next(94, 100),
        Systolic = Random.Shared.Next(105, 135),
        Diastolic = Random.Shared.Next(65, 90),
        Timestamp = DateTime.UtcNow
    };
});

app.Run();