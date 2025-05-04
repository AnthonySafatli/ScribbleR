using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ScribbleR.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemovedSketchTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Sketch_SketchId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Sketch");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_SketchId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SketchId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "AspNetUsers",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "SketchId",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Sketch",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CanvasPathsJson = table.Column<string>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sketch", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_SketchId",
                table: "AspNetUsers",
                column: "SketchId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Sketch_SketchId",
                table: "AspNetUsers",
                column: "SketchId",
                principalTable: "Sketch",
                principalColumn: "Id");
        }
    }
}
