using System;
using System.Linq;
using System.Threading.Tasks;
using GardenThymeApi.Models;
using GardenThymeApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    [Route("journal")]
    public class JournalController : Controller
    {
        private readonly IQueryService _queryService;

        public JournalController(IQueryService queryService)
        {
            _queryService = queryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]int id, [FromQuery]string userId, [FromQuery]DateTime date)
        {
            return Ok(await _queryService.Get<Journal>(TableNames.Journal, new { Id = id, UserId = userId, Date = date }));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Journal journal)
        {
            return Ok((await _queryService.Upsert<Journal>(TableNames.Journal, new
            {
                journal.Id,
                journal.UserId,
                journal.EntryDateTime,
                journal.EntryType,
                journal.PlantId,
                journal.Quantity,
                journal.RelatedJournalIds,
                journal.Longitude,
                journal.Latitude
            })).FirstOrDefault());
        }
    }
}