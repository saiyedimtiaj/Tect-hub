"use client"
import { useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { TUser } from "@/types"
import { Badge } from "@/components/ui/badge"
import SkeletonRow from "../Scaleton/SkeletonRow"
import { useGetAllUser, useUpdateUserRole } from "@/hooks/user.hooks"
import { CaretSortIcon } from "@radix-ui/react-icons"
import UserStatusDialog from "../Modal/UserStatusDialog"
import AddAdmin from "../Modal/AddAdmin"
import { useCreateAdmin } from "@/hooks/auth.hook"


const UserTable = () => {
    const { mutate: updateStatus } = useUpdateUserRole()
    const { data, isLoading, error, refetch } = useGetAllUser()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
    const [open, setOpen] = useState(false);
    const { mutate: createAdmin } = useCreateAdmin()

    const handleStatusClick = (user: TUser) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleStatusConfirm = () => {
        if (selectedUser?._id) {
            const payloed = {
                id: selectedUser?._id,
                status: selectedUser?.status === "active" ? "block" : "active"
            }
            updateStatus(payloed, {
                onSuccess: () => {
                    refetch()
                }
            })
        }
    };



    const columns: ColumnDef<TUser>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "thumbnail",
            header: () => <div className="text-left">Image</div>,
            cell: ({ row }) => {
                return <div>
                    <Image width={48} height={48} className="h-12 w-12 rounded-full object-cover" src={row.original?.profile} alt="image" />
                </div>
            },
        },
        {
            accessorKey: "name",
            header: "name",
            cell: ({ row }) => (
                <div className="capitalize">{row.original?.name}</div>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="text-left">Status</div>,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <Button
                        variant="link"
                        onClick={() => handleStatusClick(user)}
                        className="text-left font-medium"
                    >
                        <Badge className={user.status === "active" ? "bg-green-500" : "bg-red-500"}>
                            {user.status}
                        </Badge>
                    </Button>
                );
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="">Role</div>,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <Badge className={"bg-blue-500"}>
                        {user.role}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: () => <div className="text-left">Joined At</div>,
            cell: ({ row }) => {
                return <div className="text-left font-medium">{row.getValue("createdAt")}</div>
            },
        },
    ]

    const table = useReactTable({
        data: data?.data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column: any) => (
                                    <TableHead key={column.id}>
                                        {column.header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <SkeletonRow key={index} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }


    if (error) {
        return "Something went wrong!"
    }
    return (
        <div>
            <div className="flex items-center flex-wrap py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Button className="ml-1 flex justify-end mb-4" onClick={() => setOpen(true)}>Add Admin</Button>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table?.getHeaderGroups()?.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel()?.rows?.length ? (
                            table?.getRowModel()?.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {selectedUser && (
                <UserStatusDialog
                    isOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onConfirm={handleStatusConfirm}
                    selectedUser={selectedUser}
                />
            )}

            <AddAdmin refetch={refetch} createAdmin={createAdmin} isOpen={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default UserTable
