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
    public class UsuarioPacientesController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public UsuarioPacientesController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/UsuarioPacientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioPaciente>>> GetUsuarioPaciente()
        {
          if (_context.UsuarioPaciente == null)
          {
              return NotFound();
          }
            return await _context.UsuarioPaciente.ToListAsync();
        }

        // GET: api/UsuarioPacientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioPaciente>> GetUsuarioPaciente(int id)
        {
          if (_context.UsuarioPaciente == null)
          {
              return NotFound();
          }
            var usuarioPaciente = await _context.UsuarioPaciente.FindAsync(id);

            if (usuarioPaciente == null)
            {
                return NotFound();
            }

            return usuarioPaciente;
        }

        // PUT: api/UsuarioPacientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarioPaciente(int id, UsuarioPaciente usuarioPaciente)
        {
            if (id != usuarioPaciente.PacienteId)
            {
                return BadRequest();
            }

            _context.Entry(usuarioPaciente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioPacienteExists(id))
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

        // POST: api/UsuarioPacientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsuarioPaciente>> PostUsuarioPaciente(UsuarioPaciente usuarioPaciente)
        {
          if (_context.UsuarioPaciente == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.UsuarioPaciente'  is null.");
          }
            _context.UsuarioPaciente.Add(usuarioPaciente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuarioPaciente", new { id = usuarioPaciente.PacienteId }, usuarioPaciente);
        }

        // DELETE: api/UsuarioPacientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuarioPaciente(int id)
        {
            if (_context.UsuarioPaciente == null)
            {
                return NotFound();
            }
            var usuarioPaciente = await _context.UsuarioPaciente.FindAsync(id);
            if (usuarioPaciente == null)
            {
                return NotFound();
            }

            _context.UsuarioPaciente.Remove(usuarioPaciente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioPacienteExists(int id)
        {
            return (_context.UsuarioPaciente?.Any(e => e.PacienteId == id)).GetValueOrDefault();
        }
    }
}
