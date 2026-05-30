import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";
import { PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getAuthors, getBooks } from "../api";
import CreateBookModal from "../components/CreateBookModal.jsx";
import { getErrorMessage, showError } from "../utils/toast";

const columns = [
	{ title: "ID", dataIndex: "id", key: "id", ellipsis: true, width: 280 },
	{ title: "Title", dataIndex: "title", key: "title" },
	{ title: "Description", dataIndex: "description", key: "description", ellipsis: true },
	{ title: "Author ID", dataIndex: "authorId", key: "authorId", ellipsis: true, width: 280 },
];

export default function BooksPage() {
	const [books, setBooks] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [authorIdFilter, setAuthorIdFilter] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [booksRes, authorsRes] = await Promise.all([getBooks(), getAuthors()]);
			setBooks(booksRes.data);
			setAuthors(authorsRes.data);
		} catch (err) {
			showError(getErrorMessage(err, "Failed to load books"));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const filteredBooks = useMemo(() => {
		const query = authorIdFilter.trim().toLowerCase();
		if (!query) return books;
		return books.filter((book) =>
			String(book.authorId || "").toLowerCase().includes(query),
		);
	}, [books, authorIdFilter]);

	return (
		<Card>
			<Space style={{ marginBottom: 16 }} wrap>
				<Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
					Create Book
				</Button>
				<Button icon={<ReloadOutlined />} onClick={fetchData}>
					Refresh
				</Button>
				<Input
					allowClear
					prefix={<SearchOutlined />}
					placeholder="Filter by author ID"
					style={{ width: 320 }}
					value={authorIdFilter}
					onChange={(e) => setAuthorIdFilter(e.target.value)}
				/>
			</Space>

			<Table
				rowKey="id"
				columns={columns}
				dataSource={filteredBooks}
				loading={loading}
				pagination={{ pageSize: 10 }}
			/>

			<CreateBookModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				onCreated={fetchData}
				authors={authors}
			/>
		</Card>
	);
}
