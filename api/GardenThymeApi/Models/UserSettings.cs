namespace GardenThymeApi.Models
{
    public interface IUserContext
    {
        string UserId { get; set; }
        decimal Longitude { get; set; }
        decimal Latitude { get; set; }
        string ZipCode { get; set; }
    }

    public class UserSettings : IUserContext
    {
        public string UserId { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public string ZipCode { get; set; }
    }
}