import { message } from "antd";

export function showSuccess(text) {
	message.success({ content: text, style: { color: "#389e0d" } });
}

export function showError(text) {
	message.error({ content: text, style: { color: "#cf1322" } });
}

export function getErrorMessage(err, fallback = "Something went wrong") {
	return err?.response?.data?.error || err?.message || fallback;
}
