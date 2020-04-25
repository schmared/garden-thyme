using FluentMigrator;

namespace database.Migrations
{
    [Migration(2020042300L, "Adding all the tables for the first time into the db.")]
    public class M20200423_Tables : AutoReversingMigration
    {
        public override void Up()
        {
            CreateCoordinatesTableIndexes();
            CreateJournalTableIndexes();
            CreateSettingsTable();
            CreateSuggestionsTable();
        }

        private void CreateCoordinatesTableIndexes()
        {
            const string tableName = @"Coordinates";

            _ = Create.Table(tableName)
                .WithIdColumn()
                .WithColumn("ZipCode").AsAnsiString(20).Nullable()
                .WithColumn("Latitude").AsDecimal(9, 6)
                .WithColumn("Longitude").AsDecimal(9, 6)
                .WithColumn("GrowZone").AsAnsiString(20).Nullable()
                .WithColumn("TempRange").AsAnsiString(100).Nullable();
        }

        private void CreateJournalTableIndexes()
        {
            const string tableName = @"Journal";

            _ = Create.Table(tableName)
                .WithIdColumn()
                .WithColumn("UserId").AsAnsiString(100).NotNullable()
                .WithColumn("EntryDateTime").AsDateTime().Nullable()
                .WithColumn("CreatedOn").AsDateTime().Nullable().WithDefaultValue(SystemMethods.CurrentUTCDateTime)
                .WithColumn("EntryType").AsInt32().NotNullable()
                .WithColumn("PlantId").AsAnsiString(100).NotNullable()
                .WithColumn("Quantity").AsInt32().NotNullable()
                .WithColumn("RelatedJournalIds").AsAnsiString(1000).Nullable()
                .WithColumn("Longitude").AsDecimal(9, 6).Nullable()
                .WithColumn("Latitude").AsDecimal(9, 6).Nullable();
        }

        private void CreateSettingsTable()
        {
            const string tableName = @"Settings";

            _ = Create.Table(tableName)
                .WithIdColumn()
                .WithColumn("UserId").AsAnsiString(100).NotNullable()
                .WithColumn("Longitude").AsDecimal(9, 6).Nullable()
                .WithColumn("Latitude").AsDecimal(9, 6).Nullable()
                .WithColumn("ZipCode").AsAnsiString(20).Nullable();
        }

        private void CreateSuggestionsTable()
        {
            const string tableName = @"Suggestions";

            _ = Create.Table(tableName)
                .WithIdColumn()
                .WithColumn("PlantId").AsAnsiString(100).Nullable()
                .WithColumn("GrowZone").AsAnsiString(20).Nullable()
                .WithColumn("Uri").AsAnsiString(1000).Nullable()
                .WithColumn("ActionType").AsInt32().Nullable();
        }
    }
}