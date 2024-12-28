"use client"
import React, { useState } from "react"
import { Button, Modal, Input, Select, Form } from "antd"
import { useToast } from "@/hooks/use-toast"

interface CreateUserProps {
  onUserCreated: () => void
  filters: { name: string, color: string }[]
  hasFetched: boolean
}

export const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated, filters, hasFetched}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { toast } = useToast()

  const handleCreateUser = (values: { username: string, email: string, role: string, password: string }) => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to create user.")
        }
        return res.json()
      })
      .then(() => {
        toast({
          description: "User created successfully.",
        })
        onUserCreated()
        setModalOpen(false)
        form.resetFields()
      })
      .catch(err => {
        console.error(err)
        toast({
          description: "Failed to create user.",
          variant: "destructive"
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Button 
        type="link"
        onClick={() => setModalOpen(true)} 
        className="mb-4 ml-4 bg-slate-800 hover:bg-slate-700"
        disabled={!hasFetched}
      >
        Create User
      </Button>
      
      <Modal 
        title="Create New User"
        open={modalOpen} 
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText="Create"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateUser}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter the username' }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }, { type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select role">
              {filters.map(filter => (
                <Select.Option key={filter.name} value={filter.name}>
                  {filter.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateUser