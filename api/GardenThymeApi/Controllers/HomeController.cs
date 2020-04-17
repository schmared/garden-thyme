using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    public class HomeController : Controller
    {
        [Route("")]
        [Route("status")]
        [HttpGet]
        //[Authorize]
        public IActionResult Status()
        {
            return Ok();
        }
    }
}