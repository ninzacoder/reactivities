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
using MediatR;
using Application;

namespace API.Controllers
{
    
    public class ActivityController : BaseController
    {
     
        [HttpGet]
        public async Task<ActionResult<List<Domain.Activity>>> GetActivities(CancellationToken ctx)
        {
            return await Mediator.Send(new ListActivity.Query(), ctx);
        }

          
        [HttpGet("{id}")]
        public async Task<ActionResult<Domain.Activity>> GetActivity(Guid id, CancellationToken ctx)
        {
            return await Mediator.Send(new ActivityDetail.Query{Id = id}, ctx);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Domain.Activity activity, CancellationToken ctx)
        {
            return Ok(await Mediator.Send(new CreateActivity.Command{Activity = activity}, ctx));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Domain.Activity activity, CancellationToken ctx)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new EditActivity.Command {Activity = activity}, ctx));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id, CancellationToken ctx)
        {
            return Ok(await Mediator.Send(new DeleteActivity.Command {Id = id}, ctx));
        }

  }
}