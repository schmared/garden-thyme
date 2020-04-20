using System;
using System.Collections.Generic;
using GardenThymeApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    [Route("actionType")]
    public class ActionTypeController : Controller
    {
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