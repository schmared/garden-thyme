using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace GardenThymeApi.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        //[Authorize]
        public IActionResult Index()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "index.html");
            return PhysicalFile(path, "text/html");
        }

        [Route("status")]
        [HttpGet]
        public IActionResult Status()
        {
            return Ok();
        }
    }
}