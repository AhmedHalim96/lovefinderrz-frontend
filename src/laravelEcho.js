import Echo from "laravel-echo";
import io from "socket.io-client";

export default new Echo({
	broadcaster: "socket.io",
	host: `http://127.0.0.1:6001`, // this is laravel-echo-server host
	client: io,
});
