namespace TowLots.Models
{
    public class TowLot
    {
        public int Lot { get; set; }
        public int Vehicle_Id { get; set; }
        public int Tow_Reference { get; set; }
        public int Year { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Vin { get; set; }
        public string Mileage { get; set; }
        public string Reason { get; set; }
        public string Keys { get; set; }
        public string Comments { get; set; }
    }
}
