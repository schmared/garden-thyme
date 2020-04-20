using System.Linq;
using System.Threading.Tasks;
using GardenThymeApi.Models;
using GardenThymeApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    [Route("/journal")]
    public class JournalController : Controller
    {
        private readonly IQueryService _queryService;

        public JournalController(IQueryService queryService)
        {
            _queryService = queryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return Ok((await _queryService.Get<Journal>(TableNames.Journal, new { Id = id })).FirstOrDefault());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Journal userSettings)
        {
            return Ok((await _queryService.Upsert<Journal>(TableNames.Journal, new { userSettings.UserId, userSettings.Longitude, userSettings.Latitude })).FirstOrDefault());
        }
    }
}