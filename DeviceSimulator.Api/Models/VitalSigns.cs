namespace DeviceSimulator.Api.Models;

public class VitalSigns
{
    public string PatientId { get; set; } = string.Empty;
    public int HeartRate { get; set; }
    public int Spo2 { get; set; }
    public int Systolic { get; set; }
    public int Diastolic { get; set; }
    public int RespiratoryRate { get; set; }
    public double Temperature { get; set; }
    public DateTime Timestamp { get; set; }
}