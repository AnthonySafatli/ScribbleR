namespace ScribbleR.Server.Models;

public class CanvasPath
{
    public string? PathId { get; set; }
    public string? StrokeColor { get; set; }
    public float? StrokeWidth { get; set; }
    public List<Point> Points { get; set; } = new List<Point>();
    public bool? DrawMode { get; set; }
    public float? EraserWidth { get; set; }
    public string? EraserColor { get; set; }
}

public class Point
{
    public float X { get; set; }
    public float Y { get; set; }
}
