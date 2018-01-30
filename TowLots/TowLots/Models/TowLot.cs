using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace TowLots.Models
{
    [DataContract]
    public class TowLot
    {
        [DataMember]
        public int Lot { get; set; }
        [Display(Name ="Vehicle ID")]
        [DataMember]
        public int Vehicle_Id { get; set; }
        [Display(Name = "Tow Reference")]
        [DataMember]
        public int Tow_Reference { get; set; }
        [DataMember]
        public int Year { get; set; }
        [DataMember]
        public string Make { get; set; }
        [DataMember]
        public string Model { get; set; }
        [DataMember]
        public string Vin { get; set; }
        [DataMember]
        public string Mileage { get; set; }
        [DataMember]
        public string Reason { get; set; }
        [DataMember]
        public string Keys { get; set; }
        [DataMember]
        public string Comments { get; set; }
    }
}
