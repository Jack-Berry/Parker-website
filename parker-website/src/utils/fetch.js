import request from "superagent";

export function getEvents(callback) {
  const PROXY_URL = "https://holidayhomesandlets.co.uk/api/events";

  request.get(PROXY_URL).end((err, resp) => {
    if (!err) {
      const events = [];
      JSON.parse(resp.text).items.map((event) => {
        return events.push({
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
          title: event.summary,
        });
      });
      callback(events);
    } else {
      console.error("Error fetching events:", err);
    }
  });
}
