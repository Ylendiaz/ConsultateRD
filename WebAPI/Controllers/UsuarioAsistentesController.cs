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
    public class UsuarioAsistentesController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public UsuarioAsistentesController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/UsuarioAsistentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioAsistente>>> GetUsuarioAsistente()
        {
          if (_context.UsuarioAsistente == null)
          {
              return NotFound();
          }
            return await _context.UsuarioAsistente.ToListAsync();
        }

        // GET: api/UsuarioAsistentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioAsistente>> GetUsuarioAsistente(int id)
        {
          if (_context.UsuarioAsistente == null)
          {
              return NotFound();
          }
            var usuarioAsistente = await _context.UsuarioAsistente.FindAsync(id);

            if (usuarioAsistente == null)
            {
                return NotFound();
            }

            return usuarioAsistente;
        }

        // PUT: api/UsuarioAsistentes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarioAsistente(int id, UsuarioAsistente usuarioAsistente)
        {
            if (id != usuarioAsistente.DoctorId)
            {
                return BadRequest();
            }

            _context.Entry(usuarioAsistente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioAsistenteExists(id))
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

        // POST: api/UsuarioAsistentes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsuarioAsistente>> PostUsuarioAsistente(UsuarioAsistente usuarioAsistente)
        {
          if (_context.UsuarioAsistente == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.UsuarioAsistente'  is null.");
          }
            _context.UsuarioAsistente.Add(usuarioAsistente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuarioAsistente", new { id = usuarioAsistente.DoctorId }, usuarioAsistente);
        }

        // DELETE: api/UsuarioAsistentes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuarioAsistente(int id)
        {
            if (_context.UsuarioAsistente == null)
            {
                return NotFound();
            }
            var usuarioAsistente = await _context.UsuarioAsistente.FindAsync(id);
            if (usuarioAsistente == null)
            {
                return NotFound();
            }

            _context.UsuarioAsistente.Remove(usuarioAsistente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioAsistenteExists(int id)
        {
            return (_context.UsuarioAsistente?.Any(e => e.DoctorId == id)).GetValueOrDefault();
        }
    }
}
