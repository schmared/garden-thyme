using System;
using System.Net.Http.Headers;
using GardenThymeApi.Services;
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

        private readonly string _allowLocalFromLocal = "localhost_cors";

        public void ConfigureServices(IServiceCollection services)
        {
            _ = services.AddApplicationInsightsTelemetry();
            _ = services.AddControllers();
            //TODO: Add and Test Google Authentication once Authorization Header is coming from the frontend app api calls.
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

            _ = services.AddTransient<IQueryService, QueryService>();
            _ = services.AddTransient<IDbContext, DbContext>();

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
            //TODO: Add these back when enabling authentication.
            //_ = app.UseAuthentication();
            //_ = app.UseAuthorization();
            _ = app.UseStaticFiles();
            _ = app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/");
                _ = endpoints.MapFallbackToController("Index", "Home");
            });

        }
    }
}
