namespace TowLots.Models
{
    public class TowLot
    {
        public int Lot { get; set; }
        public int VehicleId { get; set; }
        public int TowReference { get; set; }
        public int Year { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Vin { get; set; }
        public string Mileage { get; set; }
        public string Keys { get; set; }
        public string Reason { get; set; }
        public string Comments { get; set; }
    }
}
