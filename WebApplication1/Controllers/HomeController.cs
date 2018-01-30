using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        private static readonly IList<VehicleModel> _vehicles;

        static HomeController()
        {
            _vehicles = new List<VehicleModel>
            {
                new VehicleModel
                {
                    VehicleID = 2384550,
                    Keys = "NO",
                    Lot = "26",
                    Make = "FORD",
                    Model = "CROWN VICT",
                    Reason = "STOLEN",
                    Tow_Reference = "899474",
                    VIN = "2FAHP71V88X166738",
                    Year = "2008"
                },

                new VehicleModel
                {
                    VehicleID = 2384551,
                    Keys = "NO",
                    Lot = "26",
                    Make = "FORD",
                    Model = "CROWN VICT",
                    Reason = "STOLEN",
                    Tow_Reference = "899474", 
                    VIN = "2FAHP71V88X166738",
                    Year = "2008"
                }
            };
        }

        public ActionResult Index()
        {
            return View();
        }

        [Route("vehicles")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult Comments()
        {
            return Json(_vehicles);
        }

    }
}
