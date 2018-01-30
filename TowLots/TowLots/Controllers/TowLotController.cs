using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TowLots.Models;

namespace TowLots.Controllers
{
    public class TowLotController: Controller
    {
        public async Task<IActionResult> Index(string searchQuery)
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri("https://data.kcmo.org")
            };
            var response = await client.GetAsync($"/resource/xpwx-fzzw.json?$$app_token=RywPlFpEm1SQhxfw6lTHBbcC9");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<IEnumerable<TowLot>>(result);
            if (!String.IsNullOrEmpty(searchQuery))
            {
                data = data.Where(s => s.Make.Contains(searchQuery.ToUpper()));
            }

            return View(data);
        }
    }
}
