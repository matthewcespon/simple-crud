"use client"
import React, { useState } from "react"
import { Button, Modal, Select, message, Spin } from "antd"
import { useToast } from "@/hooks/use-toast"

interface FindRoleProps {
  hasFetched: boolean
  filters: { name: string, color: string }[]
}

export const FindRole: React.FC<FindRoleProps> = ({ hasFetched, filters }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [findRole, setFindRole] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [foundUsernames, setFoundUsernames] = useState<string[] | null>(null)
  const { toast } = useToast()

  const handleFindRole = () => {
    if (findRole.trim() === "") {
      message.error("Please select a valid role.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      fetch(`http://localhost:8080/api/findByRole?role=${findRole}`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Role not found.")
          }
          return res.json()
        })
        .then((data: string[]) => {
          setFoundUsernames(data)
          toast({
            description: `Users with role ${findRole} have been found.`,
          })
        })
        .catch(err => {
          console.error(err)
          message.error("Failed to find users.")
          toast({
            description: "Failed to find users.",
            variant: "destructive"
          })
          setFoundUsernames(null)
        })
        .finally(() => {
          setLoading(false)
        })
    }, 500)
  }

  const Loading: React.FC = () => (
    <div className="flex justify-center items-center my-4">
      <Spin size="large" />
    </div>
  )

  return (
    <>
      <Button 
        type="link"
        onClick={() => setModalOpen(true)} 
        loading={loading} 
        disabled={!hasFetched}
        className="mb-4 ml-4 bg-slate-800 hover:bg-slate-700"
      >
        Find Users by Role
      </Button>
      
      <Modal 
        title="Find Users by Role"
        open={modalOpen} 
        onCancel={() => {
          setModalOpen(false)
          setFoundUsernames(null)
          setFindRole("")
        }} 
        onOk={handleFindRole}
        okText="Find"
        cancelText="Cancel"
        confirmLoading={loading}
        okButtonProps={{ disabled: findRole.trim() === "" }}
      >
        <Select
          placeholder="Select Role to find users"
          value={findRole}
          onChange={(value) => setFindRole(value)}
          style={{ width: '100%' }}
        >
          {filters.map(filter => (
            <Select.Option key={filter.name} value={filter.name}>
              {filter.name}
            </Select.Option>
          ))}
        </Select>
        {loading && <Loading />}
        {foundUsernames ? (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-slate-900 pb-4">Users with Role: {findRole}</h4>
            <ul>
              {foundUsernames.map((username, index) => (
                <li key={index}><strong>Username:</strong> {username}</li>
              ))}
            </ul>
          </div>
        ) :
        null}
      </Modal>
    </>
  )
}

export default FindRole