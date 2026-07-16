export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const stub = env.TEST_DO.idFromName("test");
    const doStub = env.TEST_DO.get(stub);
    const value = Math.random();
    if (url.pathname.startsWith("/pong")) {
      console.log("[worker] sending pong " + value);
      await doStub.pong(value);
    } else {
      console.log("[worker] sending ping: " + value);
      await doStub.ping(value);
    }

    return new Response("DO pinged");
  },
};

export { TestDO } from "./do";
