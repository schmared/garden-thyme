using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace GardenThymeApi.Controllers
{
    internal static class GardenOptions
    {
        public static string TrefleAuth { get; set; }
    }

    internal class TrefleResponse
    {
        public long Expiration { get; set; }
        public string Token { get; set; }
    }

    [ApiController]
    [Route("plant")]
    public class PlantController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public PlantController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]int? id, [FromQuery]string name)
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