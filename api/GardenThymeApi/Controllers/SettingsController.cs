using System.Threading.Tasks;
using GardenThymeApi.Services;
using GardenThymeApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    [Route("/settings")]
    public class SettingsController : Controller
    {
        private readonly IQueryService _queryService;

        public SettingsController(IQueryService queryService)
        {
            _queryService = queryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok((await _queryService.Get<UserSettings>(TableNames.Settings, new { _userContext.UserId })).FirstOrDefault());
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]UserSettings userSettings)
        {
            return Ok((await _queryService.Upsert<UserSettings>(TableNames.Settings, new { userSettings.UserId, userSettings.Longitude, userSettings.Latitude })).FirstOrDefault());
        }
    }
}