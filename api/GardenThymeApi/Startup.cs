using System;
using System.IO;
using System.Net.Http.Headers;
using System.Reflection;
using GardenThymeApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

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

            _ = services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "GardenThyme API", Version = "v1" });
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
            });
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
            _ = app.UseSwagger();
            _ = app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "GardenThyme API V1"); });
            _ = app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/");
                _ = endpoints.MapFallbackToController("Index", "Home");
            });
        }
    }
}
