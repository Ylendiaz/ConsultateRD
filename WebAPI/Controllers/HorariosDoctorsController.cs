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
    public class HorariosDoctorsController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public HorariosDoctorsController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/HorariosDoctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HorariosDoctor>>> GetHorariosDoctor()
        {
          if (_context.HorariosDoctor == null)
          {
              return NotFound();
          }
            return await _context.HorariosDoctor.ToListAsync();
        }

        // GET: api/HorariosDoctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HorariosDoctor>> GetHorariosDoctor(int id)
        {
          if (_context.HorariosDoctor == null)
          {
              return NotFound();
          }
            var horariosDoctor = await _context.HorariosDoctor.FindAsync(id);

            if (horariosDoctor == null)
            {
                return NotFound();
            }

            return horariosDoctor;
        }

        // PUT: api/HorariosDoctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHorariosDoctor(int id, HorariosDoctor horariosDoctor)
        {
            if (id != horariosDoctor.HorarioId)
            {
                return BadRequest();
            }

            _context.Entry(horariosDoctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HorariosDoctorExists(id))
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

        // POST: api/HorariosDoctors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HorariosDoctor>> PostHorariosDoctor(HorariosDoctor horariosDoctor)
        {
          if (_context.HorariosDoctor == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.HorariosDoctor'  is null.");
          }
            _context.HorariosDoctor.Add(horariosDoctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHorariosDoctor", new { id = horariosDoctor.HorarioId }, horariosDoctor);
        }

        // DELETE: api/HorariosDoctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHorariosDoctor(int id)
        {
            if (_context.HorariosDoctor == null)
            {
                return NotFound();
            }
            var horariosDoctor = await _context.HorariosDoctor.FindAsync(id);
            if (horariosDoctor == null)
            {
                return NotFound();
            }

            _context.HorariosDoctor.Remove(horariosDoctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HorariosDoctorExists(int id)
        {
            return (_context.HorariosDoctor?.Any(e => e.HorarioId == id)).GetValueOrDefault();
        }
    }
}
