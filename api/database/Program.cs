namespace database
{
    internal class Program
    {
        // TODO: Finish Implementing Active Database Migrations (Requires FlientMigrator.Runner package)
        private static void Main(string[] args)
        {
        //     using (var scope = CreateServices().CreateScope())
        //         UpdateDatabase(scope.ServiceProvider);
        }

        // public static IConfiguration Configuration { get; set; }

        // private static IServiceProvider CreateServices()
        // {
        //     Configuration = new ConfigurationBuilder()
        //         .SetBasePath(Directory.GetCurrentDirectory())
        //         .AddJsonFile("appsettings.json")
        //         .Build();

        //     return new ServiceCollection()
        //         .AddFluentMigratorCore()
        //         .ConfigureRunner(rb => rb
        //             .AddSqlServer()
        //             .WithGlobalConnectionString(Configuration["{ConnectionStrings.database}"])
        //             .ScanIn(typeof(M0_EmptyDb).Assembly).For.Migrations())
        //         .AddLogging(lb => lb.AddFluentMigratorConsole())
        //         .BuildServiceProvider(false);
        // }

        // private static void UpdateDatabase(IServiceProvider serviceProvider)
        // {
        //     serviceProvider.GetRequiredService<IMigrationRunner>().MigrateUp();
        // }
    }
}
