"use client"
import React, { useState } from "react"
import { Button, Modal, Input, message, Spin } from "antd"
import { User } from "./page"
import { useToast } from "@/hooks/use-toast"

interface FindUserProps {
  hasFetched: boolean
}


export const FindUser: React.FC<FindUserProps> = ({ hasFetched}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [findId, setFindId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [foundUser, setFoundUser] = useState<User | null>(null)
  const { toast } = useToast()

  const handleFindUser = () => {
    const idNumber = Number(findId)
    if (isNaN(idNumber) || idNumber <= 0) {
      message.error("Please enter a valid positive number for ID.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      fetch(`http://localhost:8080/api/findById?id=${idNumber}`)
        .then(res => {
          if (!res.ok) {
            throw new Error("User not found.")
          }
          return res.json()
        })
        .then((data: User) => {
          setFoundUser(data)
          toast({
            description:`User with ID ${idNumber} has been found.`,
          })
        })
        .catch(err => {
          console.error(err)
          message.error("Failed to find user.")
          toast({
            description:"Failed to find user.",
            variant: "destructive"
          })
          setFoundUser(null)
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
        Find User by ID
      </Button>
      
      <Modal 
        title="Find User by ID"
        open={modalOpen} 
        onCancel={() => {
          setModalOpen(false)
          setFoundUser(null)
          setFindId("")
        }} 
        onOk={handleFindUser}
        okText="Find"
        cancelText="Cancel"
        confirmLoading={loading}
        okButtonProps={{ disabled: findId.trim() === "" }}
      >
        <Input
          placeholder="Enter User ID to find"
          value={findId}
          onChange={(e) => setFindId(e.target.value)}
          type="number"
          min="1"
          max="999999"
          step="1"
        />
        {loading && <Loading />}
        {foundUser ? (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-slate-900 pb-4">User Details:</h4>
            <p><strong>ID:</strong> {foundUser.id}</p>
            <p><strong>Username:</strong> {foundUser.username}</p>
            <p><strong>Email:</strong> {foundUser.email}</p>
            <p><strong>Role:</strong> {foundUser.role}</p>
            <p><strong>Password:</strong> {foundUser.password}</p>
          </div>
        ) :
        null}
      </Modal>
    </>
  )
}

export default FindUser