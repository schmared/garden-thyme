using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GardenThymeApi.Services
{
#pragma warning disable CS1591
    public interface IDbContext
    {
        IDbConnection Connection { get; }
    }

    public class DbContext : IDbContext
    {
        public IDbConnection Connection { get; private set; }
        public DbContext(IConfiguration configuration)
        {
            Connection = new SqlConnection(configuration.GetConnectionString("database"));
        }
    }
#pragma warning restore CS1591
}