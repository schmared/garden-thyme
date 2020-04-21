using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace GardenThymeApi.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/index.html");
            return PhysicalFile(path, "text/html");
        }

        [Route("keys")]
        [HttpGet]
        public IActionResult GetKeys()
        {
            return Ok(new
            {
                mapsKey = _configuration.GetValue<string>("Authentication:Google:MapsKey"),
                clientId = _configuration.GetValue<string>("Authentication:Google:ClientId")
            });
        }

        [HttpGet]
        [Route("status")]
        public IActionResult Status()
        {
            return Ok();
        }
    }
}