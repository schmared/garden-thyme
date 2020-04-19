using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        //[Authorize]
        public IActionResult Index()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/index.html");
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