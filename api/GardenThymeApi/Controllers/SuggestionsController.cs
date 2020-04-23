using System.Threading.Tasks;
using GardenThymeApi.Models;
using GardenThymeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("suggestions")]
    public class SuggestionsController : Controller
    {
        private readonly IQueryService _queryService;

        public SuggestionsController(IQueryService queryService)
        {
            _queryService = queryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]string userId)
        {
            return Ok(await _queryService.Get<Suggestion>(TableNames.Suggestions, new { UserId = userId }));
        }
    }
}