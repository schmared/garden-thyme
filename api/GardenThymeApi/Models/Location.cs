using System.ComponentModel;

namespace GardenThymeApi.Models
{
    public class Location
    {
        public Zone Zone { get; set; }
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }
    }

    public enum Zone
    {
        [Description("1")]
        One = 100,
        [Description("1A")]
        OneA = 110,
        [Description("1B")]
        OneB = 120,

        [Description("2")]
        Two = 200,
        [Description("2a")]
        TwoA = 210,
        [Description("2b")]
        TwoB = 220,

        [Description("3")]
        Three = 300,
        [Description("3a")]
        ThreeA = 310,
        [Description("3b")]
        ThreeB = 320,

        [Description("4")]
        Four = 400,
        [Description("4a")]
        FourA = 410,
        [Description("4b")]
        FourB = 420,

        [Description("5")]
        Five = 500,
        [Description("5a")]
        FiveA = 510,
        [Description("5b")]
        FiveB = 520,

        [Description("6")]
        Six = 600,
        [Description("6a")]
        SixA = 610,
        [Description("6b")]
        SixB = 620,

        [Description("7")]
        Seven = 700,
        [Description("7a")]
        SevenA = 710,
        [Description("7b")]
        SevenB = 720,

        [Description("8")]
        Eight = 800,
        [Description("8a")]
        EightA = 810,
        [Description("8b")]
        EightB = 820,

        [Description("9")]
        Nine = 900,
        [Description("9a")]
        NineA = 910,
        [Description("9b")]
        NineB = 920,

        [Description("10")]
        Ten = 1000,
        [Description("10a")]
        TenA = 1010,
        [Description("10b")]
        TenB = 1020,

        [Description("11")]
        Eleven = 1100,
        [Description("11a")]
        ElevenA = 1110,
        [Description("11")]
        ElevenB = 1120
    }
}