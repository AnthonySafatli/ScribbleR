namespace ScribbleR.Server.Models;

public class CanvasPath
{
    public bool? DrawMode { get; set; }
    public List<Point> Paths { get; set; } = new List<Point>();
    public double? endTimestamp { get; set; }
    public double? startTimestamp { get; set; }
    public string? StrokeColor { get; set; }
    public double? StrokeWidth { get; set; }
}

public class Point
{
    public float X { get; set; }
    public float Y { get; set; }
}
