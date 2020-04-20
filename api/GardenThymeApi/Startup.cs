using System;
using System.Net.Http.Headers;
using GardenThymeApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using GardenThymeApi.Models;

namespace GardenThymeApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private readonly string _allowLocalFromLocal = "localhost_cors";

        public void ConfigureServices(IServiceCollection services)
        {
            _ = services.AddControllers();
            // _ = services.AddAuthentication(auth => { auth.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme; })
            //     .AddGoogle(options =>
            //     {
            //         var googleAuthNSection = Configuration.GetSection("Authentication:Google");

            //         options.ClientId = googleAuthNSection["ClientId"];
            //         options.ClientSecret = googleAuthNSection["ClientSecret"];
            //     });

            _ = services.AddHttpClient("trefle_auth", client =>
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.BaseAddress = new Uri($"https://trefle.io/api/auth/claim?token={Configuration.GetSection("trefle:token").Value}&origin=localhost");
                client.Timeout = TimeSpan.FromMilliseconds(50 * 1000);
            });
            _ = services.AddHttpClient("trefle", client =>
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.BaseAddress = new Uri("https://trefle.io/api/plants/");
                client.Timeout = TimeSpan.FromMilliseconds(50 * 1000);
            });

            _ = services.AddSingleton<IDbContext, DbContext>();
            _ = services.AddSingleton<IQueryService, QueryService>();
            _ = services.AddTransient<IUserContext>(u => new UserSettings { UserId = "0", Longitude = 1m, Latitude = 1m });

            _ = services.AddCors(options => options.AddPolicy(name: _allowLocalFromLocal, builder => builder
                .WithOrigins("http://localhost:8081").AllowAnyMethod().AllowAnyHeader()));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                _ = app.UseDeveloperExceptionPage();
                _ = app.UseCors(_allowLocalFromLocal);
            }

            _ = app.UseHttpsRedirection();
            _ = app.UseRouting();
            //_ = app.UseAuthentication();
            _ = app.UseStaticFiles();
            //_ = app.UseAuthorization();
            _ = app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
                _ = endpoints.MapFallbackToController("Index", "Home");
            });

        }
    }
}
