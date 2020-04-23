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

        //TODO: API is serving up the frontend via this endpoint for development stage of the project and to
        // minimize initial hosting costs. With an owned Custom Domain we can host the frontend app somewhere else.
        [HttpGet]
        public IActionResult Index()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/index.html");
            return PhysicalFile(path, "text/html");
        }

        //TODO: This is keeping the secure keys for the frontend out of the repo but is still not secure.
        // Production hosting environment needs to have a secure environment for such variables for the frontend app.
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