using System;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    public class HomeController : Controller
    {
        [HttpGet]
        //[Authorize]
        public IActionResult Index()
        {
            return File(Environment.CurrentDirectory + "index.html", "text/html");
        }

        [Route("status")]
        public IActionResult Status()
        {
            return Ok();
        }
    }
}