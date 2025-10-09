## Cloudflare Tail Worker Repro

This repo shows a possible bug with cloudflare workers, durable objects and tail worker.

# Problem

When a Durable Object makes a connection to pg, it stops sending logs to the worker's configured Tail Worker.

# Repro Steps:

1. pnpm install
2. in terminal 1: run the worker: `pnpm run worker`
3. in terminal 2: run the tail: `pnpm run tail`


there are two routes on the worker:
- `/ping` - this calls `DO.ping()` and this does the pg connection. This is what breaks things
- `/pong` - this calls `DO.pong()` and that method simply console.logs, without a pg connection.


4. make an http request to http://localhost:9988/pong

  Note the logs **in the tail worker** terminal are there. (do not get confused with logs in the `worker` worker, those will be visible. The issue here is the tail worker not receiving the logs)

5.  make an http request to http://localhost:9988/ping

  From here on out, no more **DurableObject** logs will be seen in the tail worker. The `worker`'s logs still get tailed, but not the DO's (prefixed with `"[DO]"`)


If the workers are left up, eventually the logs do show up, 20-30 min later.
