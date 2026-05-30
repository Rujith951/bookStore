import { Form, Input, Modal, Select } from "antd";
import { createBook } from "../api";
import { getErrorMessage, showError, showSuccess } from "../utils/toast";

export default function CreateBookModal({ open, onClose, onCreated, authors }) {
	const [form] = Form.useForm();

	const handleSubmit = async () => {
		try {
			const values = await form.validateFields();
			await createBook(values);
			showSuccess("Book created successfully");
			form.resetFields();
			onCreated?.();
			onClose();
		} catch (err) {
			if (err?.errorFields) return;
			showError(getErrorMessage(err, "Failed to create book"));
		}
	};

	const authorOptions = authors.map((a) => ({
		value: a.id,
		label: `${a.firstName} ${a.secondName || ""}`.trim() + ` (${a.email})`,
	}));

	return (
		<Modal
			title="Create Book"
			open={open}
			onCancel={onClose}
			onOk={handleSubmit}
			okText="Create"
			destroyOnClose
		>
			<Form form={form} layout="vertical" preserve={false}>
				<Form.Item
					name="title"
					label="Title"
					rules={[{ required: true, message: "Title is required" }]}
				>
					<Input placeholder="Book title" />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<Input.TextArea rows={3} placeholder="Optional description" />
				</Form.Item>
				<Form.Item
					name="authorId"
					label="Author"
					rules={[{ required: true, message: "Author is required" }]}
				>
					<Select
						showSearch
						placeholder="Select author"
						options={authorOptions}
						optionFilterProp="label"
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
}
