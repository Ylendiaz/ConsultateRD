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
    public class LoginTblsController : ControllerBase
    {
        private readonly consultate_rd_dbContext _context;

        public LoginTblsController(consultate_rd_dbContext context)
        {
            _context = context;
        }

        // GET: api/LoginTbls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoginTbl>>> GetLoginTbl()
        {
          if (_context.LoginTbl == null)
          {
              return NotFound();
          }
            return await _context.LoginTbl.ToListAsync();
        }

        // GET: api/LoginTbls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoginTbl>> GetLoginTbl(int id)
        {
          if (_context.LoginTbl == null)
          {
              return NotFound();
          }
            var loginTbl = await _context.LoginTbl.FindAsync(id);

            if (loginTbl == null)
            {
                return NotFound();
            }

            return loginTbl;
        }

        // GET: api/LoginTbls/IniciarSecion
        [HttpGet("{username}/{password}")]
        public ActionResult<List<LoginTbl>> GetIniciarSesion(string username, string password) //dos parametros username y password
        {
            //trata de buscar en la tabla una entrada en la que coincidan el username con el parametro de correo y el password con el UsuarioContraseña
            var loginTbl = _context.LoginTbl.Where(usuario => usuario.CorreoElectronico.Equals(username) && usuario.UsuarioContraseña.Equals(password)).ToList();

            //si no encontro entrada en la tabla que coincida retorna not found
            if (_context.LoginTbl == null)
            {
                return NotFound();
            }

            return loginTbl;
        }

        // PUT: api/LoginTbls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoginTbl(int id, LoginTbl loginTbl)
        {
            if (id != loginTbl.LoginId)
            {
                return BadRequest();
            }

            _context.Entry(loginTbl).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginTblExists(id))
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

        // POST: api/LoginTbls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LoginTbl>> PostLoginTbl(LoginTbl loginTbl)
        {
          if (_context.LoginTbl == null)
          {
              return Problem("Entity set 'consultate_rd_dbContext.LoginTbl'  is null.");
          }
            _context.LoginTbl.Add(loginTbl);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoginTbl", new { id = loginTbl.LoginId }, loginTbl);
        }

        // DELETE: api/LoginTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoginTbl(int id)
        {
            if (_context.LoginTbl == null)
            {
                return NotFound();
            }
            var loginTbl = await _context.LoginTbl.FindAsync(id);
            if (loginTbl == null)
            {
                return NotFound();
            }

            _context.LoginTbl.Remove(loginTbl);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginTblExists(int id)
        {
            return (_context.LoginTbl?.Any(e => e.LoginId == id)).GetValueOrDefault();
        }
    }
}
