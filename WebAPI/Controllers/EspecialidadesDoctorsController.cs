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
    public class EspecialidadesDoctorsController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public EspecialidadesDoctorsController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/EspecialidadesDoctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EspecialidadesDoctor>>> GetEspecialidadesDoctor()
        {
          if (_context.EspecialidadesDoctor == null)
          {
              return NotFound();
          }
            return await _context.EspecialidadesDoctor.ToListAsync();
        }

        // GET: api/EspecialidadesDoctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EspecialidadesDoctor>> GetEspecialidadesDoctor(int id)
        {
          if (_context.EspecialidadesDoctor == null)
          {
              return NotFound();
          }
            var especialidadesDoctor = await _context.EspecialidadesDoctor.FindAsync(id);

            if (especialidadesDoctor == null)
            {
                return NotFound();
            }

            return especialidadesDoctor;
        }

        // PUT: api/EspecialidadesDoctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEspecialidadesDoctor(int id, EspecialidadesDoctor especialidadesDoctor)
        {
            if (id != especialidadesDoctor.EspecialidadesDoctorId)
            {
                return BadRequest();
            }

            _context.Entry(especialidadesDoctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EspecialidadesDoctorExists(id))
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

        // POST: api/EspecialidadesDoctors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EspecialidadesDoctor>> PostEspecialidadesDoctor(EspecialidadesDoctor especialidadesDoctor)
        {
          if (_context.EspecialidadesDoctor == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.EspecialidadesDoctor'  is null.");
          }
            _context.EspecialidadesDoctor.Add(especialidadesDoctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEspecialidadesDoctor", new { id = especialidadesDoctor.EspecialidadesDoctorId }, especialidadesDoctor);
        }

        // DELETE: api/EspecialidadesDoctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEspecialidadesDoctor(int id)
        {
            if (_context.EspecialidadesDoctor == null)
            {
                return NotFound();
            }
            var especialidadesDoctor = await _context.EspecialidadesDoctor.FindAsync(id);
            if (especialidadesDoctor == null)
            {
                return NotFound();
            }

            _context.EspecialidadesDoctor.Remove(especialidadesDoctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EspecialidadesDoctorExists(int id)
        {
            return (_context.EspecialidadesDoctor?.Any(e => e.EspecialidadesDoctorId == id)).GetValueOrDefault();
        }

    }
}
