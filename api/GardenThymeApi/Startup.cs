using System;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GardenThymeApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            _ = services.AddControllers();
            _ = services.AddAuthentication(GoogleDefaults.AuthenticationScheme).AddGoogle(options =>
            {
                IConfigurationSection googleAuthNSection =
                    Configuration.GetSection("Authentication:Google");

                options.ClientId = googleAuthNSection["ClientId"];
                options.ClientSecret = googleAuthNSection["ClientSecret"];
            });

            _ = services.AddHttpClient("trefle_auth", client =>
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.BaseAddress = new Uri($"https://trefle.io/api/auth/claim?token={trefle:token}&origin=localhost");
                client.Timeout = TimeSpan.FromMilliseconds(50 * 1000);
            });

            _ = services.AddHttpClient("trefle", client =>
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.BaseAddress = new Uri("");
                client.Timeout = TimeSpan.FromMilliseconds(50 * 1000);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                _ = app.UseDeveloperExceptionPage();

            _ = app.UseHttpsRedirection();
            _ = app.UseRouting();
            _ = app.UseAuthorization();
            _ = app.UseAuthentication();

            _ = app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllers();
            });
        }
    }
}
