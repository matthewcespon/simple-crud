"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { Button, Input, Spin, Table, Tag } from "antd";
import { DeleteUser } from "./delete-user";
import FindUser from "./find-user";
import FindRole from "./find-role";
import { useToast } from "@/hooks/use-toast";
import CreateUser from "./create-user";
import UpdateUser from "./update-user";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

interface Filter {
  name: string;
  color: string;
}

export const initialFilters: Filter[] = [
  { name: "Developer", color: "#FFB3BA" }, // Light Pink
  { name: "Manager", color: "#FFDFBA" }, // Light Orange
  { name: "Senior Dev", color: "#FFFFBA" }, // Light Yellow
  { name: "Junior Dev", color: "#BAFFC9" }, // Light Green
  { name: "DevOps Engineer", color: "#BAE1FF" }, // Light Blue
];

export default function MainPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filters] = useState<Filter[]>(initialFilters);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

  const toggleFilter = (filterName: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((name) => name !== filterName)
        : [...prev, filterName]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const filteredUsers =
    selectedFilters.length > 0
      ? users.filter((user) => selectedFilters.includes(user.role))
      : users;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: User, b: User) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a: User, b: User) => a.username.localeCompare(b.username), // Alphabetical sorter for Username
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: initialFilters.map((filter) => ({
        text: filter.name,
        value: filter.name,
      })),
      onFilter: (value: string, record: User) => record.role.includes(value),
      render: (role: string) => {
        const filter = initialFilters.find((f) => f.name === role);
        return filter ? <Tag color={filter.color}>{role}</Tag> : role;
      },
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: (text: string) => {
        return (
          <span>
            {visible ? text : "•".repeat(8)}
            <Button
              type="link"
              onClick={() => setVisible(!visible)}
              className="ml-2"
            >
              {visible ? "Hide" : "Show"}
            </Button>
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleFetchUsers = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/findAll`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch!");
        }

        if (!hasFetched) {
          toast({
            description: "Fetch successful.",
          });
        }
        setHasFetched(true); // Update hasFetched after successful fetch
        return res.json();
      })
      .then((json) => setUsers(json))
      .catch((err) => {
        console.error(err);
        toast({
          description: "Failed to fetch user.",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  };

  const Loading: React.FC = () => (
    <div className="flex justify-center items-center my-4">
      <Spin size="large" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-950">
      <NavBar />
      <main className="container mx-auto px-4 py-16">
        <Button
          type="primary"
          onClick={handleFetchUsers}
          loading={loading}
          className="mb-4 "
          style={{ width: "130px" }}
        >
          {hasFetched ? "Refresh" : "Fetch Users"}
        </Button>

        <DeleteUser 
          setUsers={setUsers}   
          hasFetched={hasFetched} />

        <FindUser   
          hasFetched={hasFetched} />

        <FindRole  
          hasFetched={hasFetched}   
          filters={filters} />{" "}

        <CreateUser
          onUserCreated={handleFetchUsers}
          filters={filters}
          hasFetched={hasFetched}
        />
        <UpdateUser 
          onUserUpdated={handleFetchUsers} 
          hasFetched={hasFetched} />

        {/* QUICK FILTERS */}
        {hasFetched ? (
          <div className="mb-8 p-6 rounded-md bg-zinc-600/20 border border-zinc-700/30">
            <h2 className="text-l font-semibold text-white mb-4">
              Quick Filters:
            </h2>
            <Input
              placeholder="Search Username"
              className="mb-4 w-60"
              value={value}
              onChange={(e) => {
                const currValue = e.target.value;
                setValue(currValue);
                const filteredData = users.filter((entry) =>
                  entry.username.includes(currValue)
                );
                setUsers(filteredData);
              }}
            />
            <Button
              type="text"
              onClick={() => {
                setValue("");
                handleFetchUsers();
              }}
              className="text-white ml-2"
            >
              Clear
            </Button>

            <div className="flex flex-wrap gap-4 items-center">
              {filters.map((filter) => (
                <Button
                  variant="outlined"
                  key={filter.name}
                  className={`text-s transition-colors group ${
                    selectedFilters.includes(filter.name)
                      ? "rounded-3xl h-8 bg-zinc-200 text-zinc-900 border-1 border-white hover:bg-zinc-200 hover:text-zinc-950"
                      : "rounded-3xl h-8 bg-zinc-700 text-zinc-100 border-transparent hover:bg-zinc-400 hover:text-white"
                  }`}
                  onClick={() => toggleFilter(filter.name)}
                >
                  {filter.name}
                </Button>
              ))}
              <Button
                variant="solid"
                className="ml-auto rounded-none bg-transparent h-8 text-sm text-zinc-100 hover:bg-transparent hover:text-white border-zinc-200"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        ) : null}

        {loading ? (
          <Loading />
        ) : (
          <Table
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            columns={columns as any}
            dataSource={filteredUsers}
            rowKey="id"
            pagination={{
              pageSize: 40,
            }}
            virtual
            scroll={{
              y: 85 * 5,
            }}
            loading={loading}
            className="main-table"
          />
        )}
        <Footer />
      </main>
    </div>
  );
}
