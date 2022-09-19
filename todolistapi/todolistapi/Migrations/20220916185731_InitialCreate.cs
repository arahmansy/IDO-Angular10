using Microsoft.EntityFrameworkCore.Migrations;

namespace todolistapi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ToDoLists",
                columns: table => new
                {
                    itemID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    itemName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    itemDescription = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    itemStatus = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    itemCategory = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    itemImportance = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    itemDueDate = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    itemEstimate = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoLists", x => x.itemID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ToDoLists");
        }
    }
}
