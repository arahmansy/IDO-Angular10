using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todolistapi.Models
{
    public class ToDoListContext:DbContext
    {
            public ToDoListContext(DbContextOptions<ToDoListContext> options) :base (options)
        {


        }

        public DbSet<Todolist> ToDoLists { get; set; }

    }
}
