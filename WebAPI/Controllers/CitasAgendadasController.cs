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
    public class CitasAgendadasController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public CitasAgendadasController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/CitasAgendadas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CitasAgendadas>>> GetCitasAgendadas()
        {
          if (_context.CitasAgendadas == null)
          {
              return NotFound();
          }
            return await _context.CitasAgendadas.ToListAsync();
        }

        // GET: api/CitasAgendadas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CitasAgendadas>> GetCitasAgendadas(int id)
        {
          if (_context.CitasAgendadas == null)
          {
              return NotFound();
          }
            var citasAgendadas = await _context.CitasAgendadas.FindAsync(id);

            if (citasAgendadas == null)
            {
                return NotFound();
            }

            return citasAgendadas;
        }

        // PUT: api/CitasAgendadas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCitasAgendadas(int id, CitasAgendadas citasAgendadas)
        {
            if (id != citasAgendadas.CitaId)
            {
                return BadRequest();
            }

            _context.Entry(citasAgendadas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CitasAgendadasExists(id))
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

        // POST: api/CitasAgendadas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CitasAgendadas>> PostCitasAgendadas(CitasAgendadas citasAgendadas)
        {
          if (_context.CitasAgendadas == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.CitasAgendadas'  is null.");
          }
            _context.CitasAgendadas.Add(citasAgendadas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCitasAgendadas", new { id = citasAgendadas.CitaId }, citasAgendadas);
        }

        // DELETE: api/CitasAgendadas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCitasAgendadas(int id)
        {
            if (_context.CitasAgendadas == null)
            {
                return NotFound();
            }
            var citasAgendadas = await _context.CitasAgendadas.FindAsync(id);
            if (citasAgendadas == null)
            {
                return NotFound();
            }

            _context.CitasAgendadas.Remove(citasAgendadas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CitasAgendadasExists(int id)
        {
            return (_context.CitasAgendadas?.Any(e => e.CitaId == id)).GetValueOrDefault();
        }
    }
}
