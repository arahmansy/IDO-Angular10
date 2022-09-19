using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace todolistapi.Models
{
    public class Todolist
    {
        [Key]
        public int itemID { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public String itemName { get; set; }


        [Column(TypeName = "nvarchar(100)")]
        public String itemDescription { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public String itemStatus { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public String itemCategory { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public String itemImportance { get; set; }


        [Column(TypeName = "nvarchar(100)")]
        public String itemDueDate { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public String itemEstimate { get; set; }
         
    }

   

}
