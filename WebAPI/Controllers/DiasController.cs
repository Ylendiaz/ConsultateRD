using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiasController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public DiasController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/Dias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dias>>> GetDias()
        {
          if (_context.Dias == null)
          {
              return NotFound();
          }
            return await _context.Dias.ToListAsync();
        }

        // GET: api/Dias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dias>> GetDias(int id)
        {
          if (_context.Dias == null)
          {
              return NotFound();
          }
            var dias = await _context.Dias.FindAsync(id);

            if (dias == null)
            {
                return NotFound();
            }

            return dias;
        }

        // PUT: api/Dias/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDias(int id, Dias dias)
        {
            if (id != dias.DiaId)
            {
                return BadRequest();
            }

            _context.Entry(dias).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiasExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Dias
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Dias>> PostDias(Dias dias)
        {
          if (_context.Dias == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.Dias'  is null.");
          }
            _context.Dias.Add(dias);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDias", new { id = dias.DiaId }, dias);
        }

        // DELETE: api/Dias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDias(int id)
        {
            if (_context.Dias == null)
            {
                return NotFound();
            }
            var dias = await _context.Dias.FindAsync(id);
            if (dias == null)
            {
                return NotFound();
            }

            _context.Dias.Remove(dias);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DiasExists(int id)
        {
            return (_context.Dias?.Any(e => e.DiaId == id)).GetValueOrDefault();
        }
    }
}
