import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../next.config";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () =>
    await fetch(API_URL + "/post/getPosts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data?.Posts || []);
        setLoading(false);
      });

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, []);

  const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "User Id", dataIndex: "user_id", key: "userId" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Body", dataIndex: "body", key: "body" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={posts || []}
      loading={loading}
      pagination={{
        hideOnSinglePage: true,
        position: ["bottomCenter", "bottomRight"],
        total: posts.length,
        showQuickJumper: true,
        showTotal: (total, range) => (
          <div style={{ color: "gray" }}>{`Total: ${total}`}</div>
        ),
      }}
      style={{ paddingLeft: 50, paddingRight: 50 }}
    />
  );
}

export default Posts;
