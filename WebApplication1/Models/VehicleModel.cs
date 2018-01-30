using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class VehicleModel
    {
        public int VehicleID { get; set; }
        public string Keys { get; set; }
        public string Lot { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Reason { get; set; }
        public string Tow_Reference { get; set; }
        public string VIN { get; set; }
        public string Year { get; set; }
    }
}
