const eventSource = new EventSource("http://localhost:4040");

eventSource.onmessage = function (event) {
  console.log("Received message:", event.data);
};

eventSource.onerror = function (error) {
  console.error("Error:", error);
};
