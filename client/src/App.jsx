import { Layout, Menu } from "antd";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import UsersPage from "./pages/UsersPage.jsx";
import BooksPage from "./pages/BooksPage.jsx";

const { Header, Sider, Content } = Layout;

const menuItems = [
	{ key: "/users", icon: <UserOutlined />, label: <Link to="/users">Users</Link> },
	{ key: "/books", icon: <BookOutlined />, label: <Link to="/books">Books</Link> },
];

export default function App() {
	const location = useLocation();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider breakpoint="lg" collapsedWidth="0">
				<div
					style={{
						color: "#fff",
						fontWeight: 600,
						padding: "16px 24px",
						fontSize: 16,
					}}
				>
					Bookstore Admin
				</div>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[location.pathname]}
					items={menuItems}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						background: "#fff",
						padding: "0 24px",
						fontSize: 18,
						fontWeight: 500,
					}}
				>
					{location.pathname === "/books" ? "Books" : "Users"}
				</Header>
				<Content style={{ margin: 24 }}>
					<Routes>
						<Route path="/" element={<Navigate to="/users" replace />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/books" element={<BooksPage />} />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
}
