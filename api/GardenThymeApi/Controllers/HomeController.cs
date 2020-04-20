using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/index.html");
            return PhysicalFile(path, "text/html");
        }

        [HttpGet]
        [Route("status")]
        public IActionResult Status()
        {
            return Ok();
        }
    }
}