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
    public class UsuarioDoctoresController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public UsuarioDoctoresController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/UsuarioDoctores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDoctor>>> GetUsuarioDoctor()
        {
          if (_context.UsuarioDoctor == null)
          {
              return NotFound();
          }
            return await _context.UsuarioDoctor.ToListAsync();
        }

        // GET: api/UsuarioDoctores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDoctor>> GetUsuarioDoctor(int id)
        {
          if (_context.UsuarioDoctor == null)
          {
              return NotFound();
          }
            var usuarioDoctor = await _context.UsuarioDoctor.FindAsync(id);

            if (usuarioDoctor == null)
            {
                return NotFound();
            }

            return usuarioDoctor;
        }

        // PUT: api/UsuarioDoctores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarioDoctor(int id, UsuarioDoctor usuarioDoctor)
        {
            if (id != usuarioDoctor.DoctorId)
            {
                return BadRequest();
            }

            _context.Entry(usuarioDoctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioDoctorExists(id))
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

        // POST: api/UsuarioDoctores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsuarioDoctor>> PostUsuarioDoctor(UsuarioDoctor usuarioDoctor)
        {
          if (_context.UsuarioDoctor == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.UsuarioDoctor'  is null.");
          }
            _context.UsuarioDoctor.Add(usuarioDoctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuarioDoctor", new { id = usuarioDoctor.DoctorId }, usuarioDoctor);
        }

        // DELETE: api/UsuarioDoctores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuarioDoctor(int id)
        {
            if (_context.UsuarioDoctor == null)
            {
                return NotFound();
            }
            var usuarioDoctor = await _context.UsuarioDoctor.FindAsync(id);
            if (usuarioDoctor == null)
            {
                return NotFound();
            }

            _context.UsuarioDoctor.Remove(usuarioDoctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioDoctorExists(int id)
        {
            return (_context.UsuarioDoctor?.Any(e => e.DoctorId == id)).GetValueOrDefault();
        }

        // GET: api/UsuarioDoctoresContent
        [HttpGet("GetDoctoresContent")]
        public async Task<ActionResult<UsuarioDoctor>> GetUsuarioDoctorContent()
        {
            var usuarioDoctor = await _context.UsuarioDoctor
                .Where(c => c.DoctorId == c.DoctorId)
                .Include(c => c.EspecialidadesDoctor)
                .Include(c => c.CentroMedicoDoctor)
                .ToListAsync();

            return Ok(usuarioDoctor);
        }

    }
}
