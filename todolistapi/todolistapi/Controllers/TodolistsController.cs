using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todolistapi.Models;

namespace todolistapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodolistsController : ControllerBase
    {
        private readonly ToDoListContext _context;

        public TodolistsController(ToDoListContext context)
        {
            _context = context;
        }

        // GET: api/Todolists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todolist>>> GetToDoLists()
        {
            return await _context.ToDoLists.ToListAsync();
        }

        // GET: api/Todolists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todolist>> GetTodolist(int id)
        {
            var todolist = await _context.ToDoLists.FindAsync(id);

            if (todolist == null)
            {
                return NotFound();
            }

            return todolist;
        }

        // PUT: api/Todolists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodolist(int id, Todolist todolist)
        {
            if (id != todolist.itemID)
            {
                return BadRequest();
            }

            _context.Entry(todolist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodolistExists(id))
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

        // POST: api/Todolists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Todolist>> PostTodolist(Todolist todolist)
        {
            _context.ToDoLists.Add(todolist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodolist", new { id = todolist.itemID }, todolist);
        }

        // DELETE: api/Todolists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Todolist>> DeleteTodolist(int id)
        {
            var todolist = await _context.ToDoLists.FindAsync(id);
            if (todolist == null)
            {
                return NotFound();
            }

            _context.ToDoLists.Remove(todolist);
            await _context.SaveChangesAsync();

            return todolist;
        }

        private bool TodolistExists(int id)
        {
            return _context.ToDoLists.Any(e => e.itemID == id);
        }
    }
}
