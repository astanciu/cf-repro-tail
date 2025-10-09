export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
      const stub = env.TEST_DO.idFromName("test");
      const doStub = env.TEST_DO.get(stub);


      if (url.pathname.startsWith('/pong')) {
        console.log('[worker] sending pong')
        await doStub.pong("one");
      } else {
        console.log('[worker] sending ping')
        await doStub.ping("one");
      }

      return new Response("DO pinged");

  },
};

export { TestDO } from "./do";
