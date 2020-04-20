using System.Data;
using Microsoft.Data.SqlClient;

namespace GardenThymeApi.Models
{
    public class Parameters
    {
        // public static SqlParameter GuidIdsSqlParameter(IList<Guid> ids)
        // {
        //     return GetParameterFromList<Guid, GuidIdCollection>("@Table", ids);
        // } 

        // public static SqlParameter GuidKeysSqlParameter(IList<Guid> ids)
        // {
        //     var parameter = GetParameterFromList<Guid, GuidKeyCollection>("@Table", ids);
        //     parameter.TypeName = "[dbo].[GuidKeys]";

        //     return parameter;
        // }

        // public static SqlParameter IntIdsSqlParameter(IList<int> ids)
        // {
        //     return GetParameterFromList<int, IntIdCollection>("@Table", ids);
        // }

        public static SqlParameter UserId(string userId)
        {
            return new SqlParameter("@UserId", SqlDbType.VarChar, 100) { Value = userId };
        }

        // internal static SqlParameter GetParameterFromList<T, TCollection>(string parameterName, IList<T> list) where TCollection : List<T>, IEnumerable<T>, new()
        // {
        //     var parameter = new SqlParameter(parameterName, SqlDbType.Structured);
        //     if (!list.Any())
        //         return parameter;

        //     var collection = new TCollection();
        //     collection.AddRange(list);

        //     parameter.Value = collection;

        //     return parameter;
        // }
    }

    // public class GuidKeyCollection : List<Guid>, IEnumerable<SqlDataRecord>
    // {
    //     IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
    //     {
    //         var record = new SqlDataRecord(new SqlMetaData("Key", SqlDbType.UniqueIdentifier));

    //         foreach (var id in this)
    //         {
    //             record.SetSqlGuid(0, id);

    //             yield return record;
    //         }
    //     }
    // }

    // public class GuidIdCollection : List<Guid>, IEnumerable<SqlDataRecord>
    // {
    //     IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
    //     {
    //         var record = new SqlDataRecord(new SqlMetaData("Id", SqlDbType.UniqueIdentifier));

    //         foreach (var id in this)
    //         {
    //             record.SetSqlGuid(0, id);

    //             yield return record;
    //         }
    //     }
    // }

    // public class IntIdCollection : List<int>, IEnumerable<SqlDataRecord>
    // {
    //     IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
    //     {
    //         var record = new SqlDataRecord(new SqlMetaData("Id", SqlDbType.Int));

    //         foreach (var id in this)
    //         {
    //             record.SetSqlInt32(0, id);

    //             yield return record;
    //         }
    //     }
    // }

    // public class StringCollection : List<string>, IEnumerable<SqlDataRecord>
    // {
    //     IEnumerator<SqlDataRecord> IEnumerable<SqlDataRecord>.GetEnumerator()
    //     {
    //         var record = new SqlDataRecord(new SqlMetaData("Id", SqlDbType.NVarChar, 4000L));

    //         foreach (var id in this)
    //         {
    //             record.SetSqlString(0, id);

    //             yield return record;
    //         }
    //     }
    // }
}