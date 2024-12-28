"use client"
import React, { useState } from "react"
import { Button, Modal, Form, Input, message } from "antd"
import { useToast } from "@/hooks/use-toast"

interface UpdateUserProps {
  onUserUpdated: () => void
  hasFetched: boolean
}

interface UserData {
  id: number
  username: string
  // Add any other fields you want to display/update
}

export const UpdateUser: React.FC<UpdateUserProps> = ({ onUserUpdated, hasFetched }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [form] = Form.useForm()
  const { toast } = useToast()

  // Fetch user data by ID
  const handleFetchUser = () => {
    const userId = form.getFieldValue("id")
    if (!userId) {
      toast({
        description: "Please enter a user ID to update.",
        variant: "destructive"
      })
      return
    }
    setFetchLoading(true)
    fetch(`http://localhost:8080/api/findById?id=${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user.")
        }
        return res.json()
      })
      .then((data: UserData) => {
        // Populate the form with the user data
        form.setFieldsValue({
          id: data.id,
          username: data.username,
          // If you have additional fields, set them here
        })
        toast({
          description: "User data loaded.",
        })
      })
      .catch((err) => {
        console.error(err)
        toast({
          description: "Failed to load user data.",
          variant: "destructive"
        })
      })
      .finally(() => setFetchLoading(false))
  }

  // PUT request to update user
  const handleUpdateUser = (values: { id: number; username: string }) => {
    setLoading(true)
    fetch("http://localhost:8080/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: values.id,
        username: values.username,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update user.")
        }
        return res.json()
      })
      .then(() => {
        message.success("User updated successfully.")
        toast({
          description: "User updated successfully.",
        })
        onUserUpdated()
        setModalOpen(false)
        form.resetFields()
      })
      .catch((err) => {
        console.error(err)
        message.error("Failed to update user.")
        toast({
          description: "Failed to update user.",
          variant: "destructive",
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Button 
        type="link"
        onClick={() => setModalOpen(true)} 
        loading={loading} 
        disabled={!hasFetched}
        className="mb-4 ml-4 bg-slate-800 hover:bg-slate-700"
      >
      Update User
      </Button>

      <Modal
        title="Update User"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
        }}
        onOk={() => form.submit()}
        okText="Update"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateUser}
        >
          <Form.Item
            label="User ID"
            name="id"
            rules={[{ required: true, message: "Please enter the user ID" }]}
          >
            <Input type="number" placeholder="Enter user ID" />
          </Form.Item>

          <Button
            type="primary"
            onClick={handleFetchUser}
            loading={fetchLoading}
            style={{ marginBottom: 24 }}
          >
            Load User Data
          </Button>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter the username" }]}
          >
            <Input placeholder="Enter new username" />
          </Form.Item>

          {/* 
            If you have other fields (e.g., email, role, etc.), 
            add them here to display and update.
          */}
        </Form>
      </Modal>
    </>
  )
}

export default UpdateUser