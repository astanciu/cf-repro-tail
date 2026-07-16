import { DurableObject } from "cloudflare:workers";
import { Client } from "pg";

const DB_URL = "postgresql://admin:admin@localhost:5432/db";

export class TestDO extends DurableObject {
  private callCount = 0;

  async ping(value) {
    this.callCount++;

    console.log(`[DO] Ping Received: ${value}`);
    const client = new Client({ connectionString: DB_URL });
    await client.connect();

    await client.end();
  }

  async pong(value) {
    console.log(`[DO] Pong Received: ${value}`);
  }
}
