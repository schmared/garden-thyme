using System;
using System.Collections.Generic;

namespace GardenThymeApi.Models
{
    public class JournalPost
    {
        public long Id { get; set; }
        public string Key { get; set; }
        public object ParentPosts { get; set; }
        public IList<Plant> Plants { get; set; }
        public DateTime EntryDate { get; set; }
    }
}