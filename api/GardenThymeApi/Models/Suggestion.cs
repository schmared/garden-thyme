namespace GardenThymeApi.Models
{
    public class Suggestion
    {
        public string PlantId { get; set; }
        // TODO: Implement Zone Enum in place of string GrowZone
        public string GrowZone { get; set; }
        public string Uri { get; set; }
    }
}