using System;
using System.Threading.Tasks;
using GardenThymeApi.Models;
using GardenThymeApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
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
        //TODO: This is very simplistic, as it only looks at things planted in the same USDA Plan Hardines Zones as the
        // user. Suggestions need to, at least, become a testable service that has logic for multiple zones and ActionTypes.
        // Also utilize Latitude and Longitude coordinates to describe and filter suggestions by general distance.
        public async Task<IActionResult> Get([FromQuery]string userId, [FromQuery]string actionType)
        {
            return Ok(await _queryService.Get<Suggestion>(TableNames.Suggestions, new { UserId = userId, ActionType = (int)Enum.Parse(typeof(ActionType), actionType) }));
        }
    }
}