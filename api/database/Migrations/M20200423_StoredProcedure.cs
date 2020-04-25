using FluentMigrator;

namespace database.Migrations
{
    [Migration(2020042301L, "Adding all the stored procedures for the first time into the db.")]
    public class M20200423_StoredProcedures : Migration
    {
        public override void Up()
        {
            CreateJournalDeleteProcedure();
            CreateJournalGetProcedure();
            CreateJournalUpsertProcedure();
        }

        private void CreateJournalDeleteProcedure()
        {
            Execute.Sql(@"
CREATE PROCEDURE [dbo].[JournalDelete]
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM [dbo].[Journal] WHERE [Id]=@Id;
END;");
        }

        private void CreateJournalGetProcedure()
        {
            Execute.Sql(@"
CREATE PROCEDURE [dbo].[JournalGet]
    @Id INT=NULL,
    @UserId VARCHAR(100)=NULL,
    @Date DATETIME=NULL
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    SELECT 
        [Id],
        [UserId],
        [EntryDateTime],
        [CreatedOn],
        [EntryType],
        [PlantId],
        [Quantity],
        [RelatedJournalIds],
        [Longitude],
        [Latitude]
    FROM [dbo].[Journal]
    WHERE
        (ISNULL(@Id,0)=0 OR [Id]=@Id)
        AND (ISNULL(@UserId,'0')='0' OR [UserId]=@UserId)
        AND (ISNULL(@Date,0)=0 OR CAST(@Date AS DATE)=CAST([EntryDateTime] AS DATE));
END;");
        }

        private void CreateJournalUpsertProcedure()
        {
            Execute.Sql(@"
CREATE PROCEDURE [dbo].[JournalUpsert]
    @Id INT=NULL,
    @UserId VARCHAR(100),
    @EntryDateTime DATETIME,
    @EntryType INT,
    @PlantId VARCHAR(100),
    @Quantity INT,
    @RelatedJournalIds VARCHAR(1000),
    @Longitude DECIMAL(9, 6),
    @Latitude DECIMAL(9, 6)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @InputTable TABLE
    (
        [Id] INT,
        [UserId] VARCHAR(100),
        [EntryDateTime] DATETIME,
        [EntryType] INT,
        [PlantId] VARCHAR(100),
        [Quantity] INT,
        [RelatedJournalIds] VARCHAR(1000),
        [Longitude] DECIMAL(9, 6),
        [Latitude] DECIMAL(9, 6)
    );
    DECLARE @OutputTable TABLE
    (
        [Id] INT,
        [UserId] VARCHAR(100),
        [EntryDateTime] DATETIME,
        [CreatedOn] DATETIME,
        [EntryType] INT,
        [PlantId] VARCHAR(100),
        [Quantity] INT,
        [RelatedJournalIds] VARCHAR(1000),
        [Longitude] DECIMAL(9, 6),
        [Latitude] DECIMAL(9, 6)
    );

    INSERT INTO @InputTable
    (
        [Id],
        [UserId],
        [EntryDateTime],
        [EntryType],
        [PlantId],
        [Quantity],
        [RelatedJournalIds],
        [Longitude],
        [Latitude]
    )
    VALUES
    (
        @Id,
        @UserId,
        @EntryDateTime,
        @EntryType,
        @PlantId,
        @Quantity,
        @RelatedJournalIds,
        @Longitude,
        @Latitude
    );

    MERGE INTO [dbo].[Journal] AS t
    USING @InputTable AS s
    ON
        t.[Id]=s.[Id]
    WHEN MATCHED
        THEN UPDATE SET
            t.[UserId]=s.[UserId],
            t.[EntryDateTime]=s.[EntryDateTime],
            t.[EntryType]=s.[EntryType],
            t.[PlantId]=s.[PlantId],
            t.[Quantity]=s.[Quantity],
            t.[RelatedJournalIds]=s.[RelatedJournalIds],
            t.[Longitude]=s.[Longitude],
            t.[Latitude]=s.[Latitude]
    WHEN NOT MATCHED
        THEN INSERT
        (
            [UserId],
            [EntryDateTime],
            [EntryType],
            [PlantId],
            [Quantity],
            [RelatedJournalIds],
            [Longitude],
            [Latitude]
        )
        VALUES
        (
            s.[UserId],
            s.[EntryDateTime],
            s.[EntryType],
            s.[PlantId],
            s.[Quantity],
            s.[RelatedJournalIds],
            s.[Longitude],
            s.[Latitude]
        )
    OUTPUT
        inserted.[Id],
        inserted.[UserId],
        inserted.[EntryDateTime],
        inserted.[CreatedOn],
        inserted.[EntryType],
        inserted.[PlantId],
        inserted.[Quantity],
        inserted.[RelatedJournalIds],
        inserted.[Longitude],
        inserted.[Latitude]
    INTO @OutputTable;

    SELECT
        [Id],
        [UserId],
        [EntryDateTime],
        [CreatedOn],
        [EntryType],
        [PlantId],
        [Quantity],
        [RelatedJournalIds],
        [Longitude],
        [Latitude]
    FROM @OutputTable;
END;");
        }

        private void CreateSettingsGet()
        {
            Execute.Sql(@"
CREATE PROCEDURE [dbo].[SettingsGet]
    @UserId VARCHAR(100)
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    IF (@UserId IS NULL)
        SELECT
            [UserId],
            [Longitude],
            [Latitude],
            [ZipCode]
        FROM [dbo].[Settings];
    ELSE
        SELECT
            [UserId],
            [Longitude],
            [Latitude],
            [ZipCode]
        FROM [dbo].[Settings]
        WHERE [UserId]=@UserId;
END;");
        }

        private void CreateSettingsUpsert()
        {
            Execute.Sql(@"
CREATE PROCEDURE [dbo].[SettingsUpsert]
    @UserId VARCHAR(100),
    @Longitude DECIMAL(9,6),
    @Latitude DECIMAL(9,6),
    @ZipCode VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @InputTable TABLE
    (
        [UserId] VARCHAR(100),
        [Longitude] DECIMAL(9,6),
        [Latitude] DECIMAL(9,6),
        [ZipCode] VARCHAR(20)
    );
    DECLARE @OutputTable TABLE
    (
        [UserId] VARCHAR(100),
        [Longitude] DECIMAL(9,6),
        [Latitude] DECIMAL(9,6),
        [ZipCode] VARCHAR(20)
    );

    INSERT INTO @InputTable ([UserId],[Longitude],[Latitude],[ZipCode]) VALUES (@UserId,@Longitude,@Latitude,@ZipCode);

    MERGE INTO [dbo].[Settings] AS t
    USING @InputTable AS s
    ON
        t.[UserId]=s.[UserId]
    WHEN MATCHED THEN
        UPDATE SET t.[Longitude]=s.[Longitude],t.[Latitude]=s.[Latitude],t.[ZipCode]=s.[ZipCode]
    WHEN NOT MATCHED THEN
        INSERT ([UserId],[Longitude],[Latitude],[ZipCode]) VALUES (s.[UserId],s.[Longitude],s.[Latitude],s.[ZipCode])
    OUTPUT inserted.[UserId],inserted.[Longitude],inserted.[Latitude],inserted.[ZipCode] INTO @OutputTable;

    SELECT
        [UserId],
        [Longitude],
        [Latitude],
        [ZipCode]
    FROM @OutputTable;
END;");
        }

        private void CreateSuggestionsGet()
        {
            Execute.Sql(@"
CREATE PROCEDURE [dbo].[SuggestionsGet]
    @UserId VARCHAR(100),
    @ActionType INT
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    SELECT
        [PlantId],
        [GrowZone],
        [Uri]
    FROM [dbo].[Suggestions] WHERE [ActionType]=@ActionType;

    -- TODO: Ensure when there are real users that they always have a Zip Code plx.

    -- DECLARE @Users TABLE ([UserId] VARCHAR(100));
    -- DECLARE @GrowZone VARCHAR(20);

    -- SELECT
    --     @GrowZone=c.[GrowZone]
    -- FROM
    --     [dbo].[Settings] AS s INNER JOIN
    --     [dbo].[Coordinates] AS c ON c.[ZipCode]=SUBSTRING(s.[ZipCode],1,5)
    -- WHERE [UserId]=@UserId;

    -- INSERT INTO @Users
    -- SELECT [UserId]
    -- FROM 
    --     [dbo].[Coordinates] AS c INNER JOIN
    --     [dbo].[Settings] AS s ON SUBSTRING(s.[ZipCode],1,5)=c.[ZipCode]
    -- WHERE
    --     c.[GrowZone]=@GrowZone
    --     AND s.[UserId]<>@UserId
    -- GROUP BY [UserId];

    -- SELECT
    --     [PlantId],
    --     [GrowZone],
    --     [Uri]
    -- FROM [dbo].[Suggestions]
    -- WHERE
    --     [ActionType]=@ActionType
    --     AND [PlantId] IN
    --     (
    --         SELECT
    --             j.[PlantId]
    --         FROM
    --             [dbo].[Journal] AS j INNER JOIN
    --             @Users AS u ON u.[UserId]=j.[UserId]
    --         WHERE j.[EntryType]=@ActionType
    --     );
END;");
        }

        public override void Down()
        {
            Execute.Sql(@"DROP PROCEDURE [dbo].[JournalDelete];");
            Execute.Sql(@"DROP PROCEDURE [dbo].[JournalGet];");
            Execute.Sql(@"DROP PROCEDURE [dbo].[JournalUpsert];");
            Execute.Sql(@"DROP PROCEDURE [dbo].[SettingsGet];");
            Execute.Sql(@"DROP PROCEDURE [dbo].[SettingsUpsert];");
            Execute.Sql(@"DROP PROCEDURE [dbo].[SuggestionsGet];");
        }
    }
}