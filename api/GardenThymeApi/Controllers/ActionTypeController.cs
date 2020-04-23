using System;
using System.Collections.Generic;
using GardenThymeApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    /// <summary> Gardening Action Type Endpoints </summary>
    [ApiController]
    [Route("actionType")]
    public class ActionTypeController : Controller
    {
        /// <summary>
        /// Get all the names and values in a dictionary of the ActionType enum
        /// </summary>
        /// <remarks> Sample request: `GET /actionType` </remarks>
        /// <returns> Dictionary with string key and int values of the ActionType enum </returns>
        [HttpGet]
        public IActionResult Get()
        {
            var result = new Dictionary<string, int>();

            foreach (var value in Enum.GetValues(typeof(ActionType)))
                result.Add(Enum.GetName(typeof(ActionType), value), (int)value);

            return Ok(result);
        }
    }
}