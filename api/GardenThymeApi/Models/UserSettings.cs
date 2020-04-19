namespace GardenThymeApi.Models
{
    public interface IUserContext
    {
        long UserId { get; set; }
        decimal Longitude { get; set; }
        decimal Latitude { get; set; }
    }

    public class UserSettings : IUserContext
    {
        public long UserId { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
    }
}