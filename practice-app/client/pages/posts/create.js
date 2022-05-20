import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { API_URL } from "../../next.config";


function Create() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const response = await fetch(API_URL + "/post/createPost", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (Math.round(response?.status / 100) === 2) {
      message.success("Post is created");
    } else message.error("Something went wrong");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: "35%" }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="User Id" name="user_id" required>
            <Input />
          </Form.Item>
          <Form.Item label="Title" name="title" required>
            <Input />
          </Form.Item>
          <Form.Item label="Body" name="body" required>
            <Input />
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Create;
