using DZ_ASP_JWT_18_11.Data;
using DZ_ASP_JWT_18_11.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DZ_ASP_JWT_18_11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KnifeController:Controller
    {
        private readonly DbContextClass _context;
        public KnifeController(DbContextClass context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<Knife>>> GetAll() => await _context.Knifes.ToListAsync();
        [HttpGet]
        [Route("GetKnifeById")]
        public async Task<ActionResult<Knife>> GetKnife(int _id) => await _context.Knifes.FirstOrDefaultAsync((e) => e.Id == _id);
        [HttpPost, Authorize]
        [Route("AddKnife")]
        public async Task<IActionResult> Add([FromForm] Knife knife)
        {
            _context.Knifes.Add(knife);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
