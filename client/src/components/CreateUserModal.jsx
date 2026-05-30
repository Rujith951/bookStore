import { Form, Input, Modal } from "antd";
import { createAuthor } from "../api";
import { getErrorMessage, showError, showSuccess } from "../utils/toast";

export default function CreateUserModal({ open, onClose, onCreated }) {
	const [form] = Form.useForm();

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			await createAuthor(values);
			showSuccess("User created successfully");
			form.resetFields();
			onCreated?.();
			onClose();
		} catch (err) {
			if (err?.errorFields) return;
			showError(getErrorMessage(err, "Failed to create user"));
		}
	};

	return (
		<Modal
			title="Create User"
			open={open}
			onCancel={onClose}
			onOk={handleSubmit}
			okText="Create"
			destroyOnClose
		>
			<Form form={form} layout="vertical" preserve={false}>
				<Form.Item
					name="firstName"
					label="First Name"
					rules={[{ required: true, message: "First name is required" }]}
				>
					<Input placeholder="John" />
				</Form.Item>
				<Form.Item name="lastName" label="Last Name">
					<Input placeholder="Doe" />
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{ required: true, message: "Email is required" },
						{ type: "email", message: "Enter a valid email" },
					]}
				>
					<Input placeholder="john@example.com" />
				</Form.Item>
			</Form>
		</Modal>
	);
}
