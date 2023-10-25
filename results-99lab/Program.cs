using Microsoft.EntityFrameworkCore;
using results_99lab.Models;
using results_99lab.Services;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddDbContext<Results99LabDBContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("Results99LabDBContext"),
       sqlServerOptionsAction: sqlOptions => {
           sqlOptions.EnableRetryOnFailure();
       })
   );//Add DB Context

builder.Services.AddScoped<ILabResultViewService, LabResultViewService>();//Dependency Injection

builder.Services.AddSingleton<AppSettingModel>(builder.Configuration.Get<AppSettingModel>());

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
//builder.Services.AddMvc(options =>
//{
//    options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
//});
var app = builder.Build();

// Configure the HTTP request pipeline.
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
