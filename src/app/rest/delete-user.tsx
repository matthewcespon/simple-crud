"use client"
import { Button, Modal, Input} from "antd"
import { useState } from "react";
import { User } from "./page";
import { useToast } from "@/hooks/use-toast";

interface DeleteUserProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  hasFetched: boolean
}

export const DeleteUser: React.FC<DeleteUserProps> = ({ setUsers, hasFetched }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string>("")
  const [deleting, setDeleting] = useState(false)
  const { toast } = useToast()

  const handleDeleteUser = () => {
    const idNumber = Number(deleteId)
    if (isNaN(idNumber) || idNumber <= 0) {
      toast({
        description: "Please enter a valid positive number for ID.",
        variant: "destructive"
      })

      return
    }

    setDeleting(true)
    fetch(`http://localhost:8080/api/deleteById?id=${idNumber}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to delete user.")
        }
      })
      .then(() => {
        // Remove the deleted user from the local state
        setUsers(prev => prev.filter(user => user.id !== idNumber))
        toast({
          description: `Users with id ${idNumber} has been deleted.`,
        })
        setModalOpen(false)
        setDeleteId("")
      })
      .catch(err => {
        console.error(err)
        toast({
          description: "Failed to delete user.",
          variant: "destructive"
        })
      })
      .finally(() => setDeleting(false))
  }
        return (
          <>
        <Button 
          type="link"
          danger
          onClick={() => setModalOpen(true)} 
          loading={deleting} 
          disabled={!hasFetched}
          className="mb-4 ml-4 bg-red-900 hover:bg-red-700 text-white"
        >
          Delete User by ID
        </Button>
        
        <Modal 
          title="Delete User by ID"
          open={modalOpen} 
          onCancel={() => setModalOpen(false)} 
          onOk={handleDeleteUser}
          okText="Delete"
          cancelText="Cancel"
          confirmLoading={deleting}
          okButtonProps={{ disabled: deleteId.trim() === "" }}
        >
          <Input
            placeholder="Enter User ID to delete"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            type="number"
            min="1"
            max="999999"
            step="1"
          />
        </Modal>
          </>
        )
      };