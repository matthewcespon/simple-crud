export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    sorter: (a: { username: string }, b: { username: string }) => a.username.localeCompare(b.username), // Alphabetical sorter for Username
    sortDirections: ['ascend', 'descend'] as const,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
  },
]