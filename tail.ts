export default {
  async tail(events: TraceItem[]) {
    for (const event of events) {
      for (const log of event.logs) {
        console.log("TAIL RECEIVED:", JSON.stringify(log));
      }
    }
  },
};
