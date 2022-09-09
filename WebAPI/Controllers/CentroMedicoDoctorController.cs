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
    public class CentroMedicoDoctorController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public CentroMedicoDoctorController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/CentroMedicoDoctor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CentroMedicoDoctor>>> GetCentroMedicoDoctor()
        {
          if (_context.CentroMedicoDoctor == null)
          {
              return NotFound();
          }
            return await _context.CentroMedicoDoctor.ToListAsync();
        }

        // GET: api/CentroMedicoDoctor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CentroMedicoDoctor>> GetCentroMedicoDoctor(int id)
        {
          if (_context.CentroMedicoDoctor == null)
          {
              return NotFound();
          }
            var centroMedicoDoctor = await _context.CentroMedicoDoctor.FindAsync(id);

            if (centroMedicoDoctor == null)
            {
                return NotFound();
            }

            return centroMedicoDoctor;
        }

        // PUT: api/CentroMedicoDoctor/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCentroMedicoDoctor(int id, CentroMedicoDoctor centroMedicoDoctor)
        {
            if (id != centroMedicoDoctor.CentroMedicoDoctorId)
            {
                return BadRequest();
            }

            _context.Entry(centroMedicoDoctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CentroMedicoDoctorExists(id))
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

        // POST: api/CentroMedicoDoctor
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CentroMedicoDoctor>> PostCentroMedicoDoctor(CentroMedicoDoctor centroMedicoDoctor)
        {
          if (_context.CentroMedicoDoctor == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.CentroMedicoDoctor'  is null.");
          }
            _context.CentroMedicoDoctor.Add(centroMedicoDoctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCentroMedicoDoctor", new { id = centroMedicoDoctor.CentroMedicoDoctorId }, centroMedicoDoctor);
        }

        // DELETE: api/CentroMedicoDoctor/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCentroMedicoDoctor(int id)
        {
            if (_context.CentroMedicoDoctor == null)
            {
                return NotFound();
            }
            var centroMedicoDoctor = await _context.CentroMedicoDoctor.FindAsync(id);
            if (centroMedicoDoctor == null)
            {
                return NotFound();
            }

            _context.CentroMedicoDoctor.Remove(centroMedicoDoctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CentroMedicoDoctorExists(int id)
        {
            return (_context.CentroMedicoDoctor?.Any(e => e.CentroMedicoDoctorId == id)).GetValueOrDefault();
        }
    }
}
