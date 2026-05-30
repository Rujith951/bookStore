import { useCallback, useEffect, useState } from "react";
import { Button, Card, Space, Table } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { getAuthors } from "../api";
import CreateUserModal from "../components/CreateUserModal.jsx";
import { getErrorMessage, showError } from "../utils/toast";

const columns = [
	{ title: "ID", dataIndex: "id", key: "id", ellipsis: true, width: 280 },
	{ title: "First Name", dataIndex: "firstName", key: "firstName" },
	{ title: "Last Name", dataIndex: "secondName", key: "secondName" },
	{ title: "Email", dataIndex: "email", key: "email" },
];

export default function UsersPage() {
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const fetchAuthors = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await getAuthors();
			setAuthors(data);
		} catch (err) {
			showError(getErrorMessage(err, "Failed to load users"));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAuthors();
	}, [fetchAuthors]);

	return (
		<Card>
			<Space style={{ marginBottom: 16 }}>
				<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
					Create User
				</Button>
				<Button icon={<ReloadOutlined />} onClick={fetchAuthors}>
					Refresh
				</Button>
			</Space>

			<Table
				rowKey="id"
				columns={columns}
				dataSource={authors}
				loading={loading}
				pagination={{ pageSize: 10 }}
			/>

			<CreateUserModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onCreated={fetchAuthors}
			/>
		</Card>
	);
}
