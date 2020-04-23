using System.Data;
using Dapper;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace GardenThymeApi.Services
{
    public enum TableNames
    {
        Settings,
        Journal,
        Suggestions
    }

    public interface IQueryService
    {
        Task<IEnumerable<T>> Get<T>(TableNames tableName, object parameters);
        Task<IEnumerable<T>> Upsert<T>(TableNames tableName, object parameters);
        Task<IEnumerable<T>> Delete<T>(TableNames tableName, object parameters);
    }

    public class QueryService : IQueryService
    {
        private readonly IDbContext _dbContext;

        public QueryService(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<T>> Get<T>(TableNames tableName, object parameters) => await _dbContext.Connection.QueryAsync<T>($"[dbo].[{tableName}Get]", parameters, commandType: CommandType.StoredProcedure);
        public async Task<IEnumerable<T>> Upsert<T>(TableNames tableName, object parameters) => await _dbContext.Connection.QueryAsync<T>($"[dbo].[{tableName}Upsert]", parameters, commandType: CommandType.StoredProcedure);
        public async Task<IEnumerable<T>> Delete<T>(TableNames tableName, object parameters) => await _dbContext.Connection.QueryAsync<T>($"[dbo].[{tableName}Delete]", parameters, commandType: CommandType.StoredProcedure);
    }
}
