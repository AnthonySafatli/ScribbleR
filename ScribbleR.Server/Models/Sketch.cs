using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ScribbleR.Server.Models;

public class Sketch
{
    public int Id { get; set; }

    [Required]
    public string? CanvasPathsJson { get; set; }

    [NotMapped]
    public CanvasPath[]? CanvasPaths
    {
        get
        {
            if (string.IsNullOrWhiteSpace(CanvasPathsJson))
                return null;

            try
            {
                return JsonSerializer.Deserialize<CanvasPath[]>(CanvasPathsJson);
            }
            catch (JsonException)
            {
                return null;
            }
        }
        set
        {
            CanvasPathsJson = value == null ? null : JsonSerializer.Serialize(value);
        }
    }
}
