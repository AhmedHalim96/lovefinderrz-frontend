export const baseURL = "http://lovefinderrz.test/api/v1";
export const avatarURL = `http://lovefinderrz.test/storage/avatars`;

export const loginConfig = {
	url: "/user/login",
	method: "post",
};

export const registerConfig = {
	url: "/user/register",
	method: "post",
};

export const profileSearchConfig = {
	url: "/user/",
	method: "get",
};

export const getChatsConfig = { url: "/chat", method: "get" };
export const sendMessageConfig = { url: "/message", method: "post" };
export const createChatConfig = {
	url: "/chat",
	method: "post",
};
