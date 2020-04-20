using System;

namespace GardenThymeApi.Models
{
    public class Journal
    {
        public int Id { get; set; }
        public long UserId { get; set; }
        public DateTime EntryDateTime { get; set; }
        public DateTime CreatedOn { get; set; }
        public int EntryType { get; set; }
        public int PlantId { get; set; }
        public int Quantity { get; set; }
        public string RelatedJournalIds { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
    }
}