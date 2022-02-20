using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class Activity : BaseController
    {
        private readonly ILogger<Activity> _logger;
        private DataContext _context;
        public Activity(DataContext context, ILogger<Activity> logger)
        {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

          
        [HttpGet("{id}")]
        public async Task<ActionResult<Domain.Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }

  }
}