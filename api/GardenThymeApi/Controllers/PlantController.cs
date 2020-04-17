using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    public class PlantController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public PlantController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlant([FromQuery]int? id, [FromQuery]string name)
        {
            var response = await _httpClientFactory.CreateClient("trefle").GetAsync(PlantUri(id, name));

            return response.IsSuccessStatusCode
                ? Ok(await response.Content.ReadAsStringAsync())
                : (IActionResult)new StatusCodeResult((int)response.StatusCode);
        }

        private string PlantUri(int? id, string name)
        {
            var idString = string.Empty;
            var nameString = string.Empty;

            if (id.HasValue && id.Value > 0)
                idString = id.ToString();

            if (!string.IsNullOrEmpty(name))
                nameString = $"?p={name}";

            return $"https://trefle.io/api/{idString}{nameString}";
        }

        private async Task<string> TrefleAccess()
        {
            var token = HttpContext.Session.Keys.FirstOrDefault(a => a == "access_token");

            if (token != null)
            {
                if (new JwtSecurityTokenHandler().ReadToken(token).ValidTo < DateTime.UtcNow.AddMinutes(1))
                    token = await GetAccessToken();
            }
            else
                token = await GetAccessToken();

            return token;
        }

        private async Task<string> GetAccessToken()
        {
            var client = _httpClientFactory.CreateClient("trefle_auth");

            
        }
    }
}