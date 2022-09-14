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
    public class InfoCreditoController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public InfoCreditoController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/InfoCredito
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InfoCredito>>> GetInfoCredito()
        {
            if (_context.InfoCredito == null)
          {
              return NotFound();
          }
            return await _context.InfoCredito.ToListAsync();
        }

        // GET: api/InfoCredito/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InfoCredito>> GetInfoCredito(int id)
        {
          if (_context.InfoCredito == null)
          {
              return NotFound();
          }
            var infoCredito = await _context.InfoCredito.FindAsync(id);

            if (infoCredito == null)
            {
                return NotFound();
            }

            return infoCredito;
        }

        // PUT: api/InfoCredito/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInfoCredito(int id, InfoCredito infoCredito)
        {
            if (id != infoCredito.InfoCreditoId)
            {
                return BadRequest();
            }

            _context.Entry(infoCredito).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InfoCreditoExists(id))
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

        // POST: api/InfoCredito
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InfoCredito>> PostInfoCredito(InfoCredito infoCredito)
        {
          if (_context.InfoCredito == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.InfoCredito'  is null.");
          }
            _context.InfoCredito.Add(infoCredito);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInfoCredito", new { id = infoCredito.InfoCreditoId }, infoCredito);
        }

        // DELETE: api/InfoCredito/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInfoCredito(int id)
        {
            if (_context.InfoCredito == null)
            {
                return NotFound();
            }
            var infoCredito = await _context.InfoCredito.FindAsync(id);
            if (infoCredito == null)
            {
                return NotFound();
            }

            _context.InfoCredito.Remove(infoCredito);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InfoCreditoExists(int id)
        {
            return (_context.InfoCredito?.Any(e => e.InfoCreditoId == id)).GetValueOrDefault();
        }
    }
}
