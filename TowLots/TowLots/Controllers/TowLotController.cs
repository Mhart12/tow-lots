using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using TowLots.Models;

namespace TowLots.Controllers
{
    public class TowLotController: Controller
    {
        public async Task<IActionResult> Index()
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri("https://data.kcmo.org")
            };
            var response = await client.GetStringAsync($"/resource/xpwx-fzzw.json?$$app_token=RywPlFpEm1SQhxfw6lTHBbcC9");
            response.En
            var result = await response.Con
            var data = JsonConvert.DeserializeObject<IEnumerable<TowLot>>(response);
            

            return View(data);
        }
    }
}
