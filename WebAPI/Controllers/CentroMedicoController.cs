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
    public class CentroMedicoController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public CentroMedicoController(consultate_rd_dbContext context)
        {
            _context = context;

        }

        // GET: api/CentroMedico
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CentroMedico>>> GetCentroMedico()
        {
            

          if (_context.CentroMedico == null)
          {
              return NotFound();
          }
            return await _context.CentroMedico.ToListAsync();
        }

        // GET: api/CentroMedico/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CentroMedico>> GetCentroMedico(int id)
        {
          if (_context.CentroMedico == null)
          {
              return NotFound();
          }
            var centroMedico = await _context.CentroMedico.FindAsync(id);

            if (centroMedico == null)
            {
                return NotFound();
            }

            return centroMedico;
        }

        // PUT: api/CentroMedico/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCentroMedico(int id, CentroMedico centroMedico)
        {
            if (id != centroMedico.CentroMedicoId)
            {
                return BadRequest();
            }

            _context.Entry(centroMedico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CentroMedicoExists(id))
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

        // POST: api/CentroMedico
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CentroMedico>> PostCentroMedico(CentroMedico centroMedico)
        {
          if (_context.CentroMedico == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.CentroMedico'  is null.");
          }
            _context.CentroMedico.Add(centroMedico);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCentroMedico", new { id = centroMedico.CentroMedicoId }, centroMedico);
        }

        // DELETE: api/CentroMedico/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCentroMedico(int id)
        {
            if (_context.CentroMedico == null)
            {
                return NotFound();
            }
            var centroMedico = await _context.CentroMedico.FindAsync(id);
            if (centroMedico == null)
            {
                return NotFound();
            }

            _context.CentroMedico.Remove(centroMedico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CentroMedicoExists(int id)
        {
            return (_context.CentroMedico?.Any(e => e.CentroMedicoId == id)).GetValueOrDefault();
        }
    }
}
