using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using GardenThymeApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace GardenThymeApi.Controllers
{
    [ApiController]
    [Authorize]
    public class PlantController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public PlantController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        [Route("/plant")]
        public async Task<IActionResult> GetPlant([FromQuery]int? id, [FromQuery]string name)
        {
            var client = _httpClientFactory.CreateClient("trefle");
            client.DefaultRequestHeaders.Add("Authorization", await TrefleAccess());

            var response = await client.GetAsync(PlantUri(id, name));

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

            return $"{idString}{nameString}";
        }

        private async Task<string> TrefleAccess()
        {
            var token = GardenOptions.TrefleAuth;

            if (!string.IsNullOrEmpty(token))
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
            var response = await _httpClientFactory.CreateClient("trefle_auth").PostAsync("", null);
            var content = await response.Content.ReadAsStringAsync();
            var trefle = JsonSerializer.Deserialize<TrefleResponse>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return trefle.Token;
        }
    }
}