using DZ_ASP_JWT_18_11.Data;
using DZ_ASP_JWT_18_11.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DZ_ASP_JWT_18_11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyProductController:Controller
    {
        private readonly DbContextClass _context;
        public MyProductController(DbContextClass context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll() => await _context.Products.ToListAsync();
        [HttpGet]
        [Route("GetProductById")]
        public async Task<ActionResult<Product>> GetProduct(int _id) => await _context.Products.FirstOrDefaultAsync((e)=>e.ProductId==_id);
        [HttpPost,Authorize]
        [Route("AddProduct")]
        public async Task<IActionResult> Add([FromForm]Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete, Authorize]
        [Route("RemoveProductById")]
        public async Task<IActionResult> Remove(int id)
        {
            Product? product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }






    }
}
