"use client";

import { useState, useMemo } from "react";
import { useGetAllUsersQuery, useDeleteUserMutation, useAdminCreateUserMutation, useUpdateUserRoleMutation } from "@/features/user/user.api";
import { User } from "@/features/auth/auth.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Users,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Shield,
  ShieldCheck,
  UserCircle,
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

const getRoleBadge = (role: string) => {
  switch (role) {
    case "SUPER_ADMIN":
      return (
        <Badge className="bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-none shadow-none font-semibold gap-1">
          <ShieldCheck className="w-3 h-3" />
          Super Admin
        </Badge>
      );
    case "ADMIN":
      return (
        <Badge className="bg-primary/10 dark:bg-primary/20 text-primary border-none shadow-none font-semibold gap-1">
          <Shield className="w-3 h-3" />
          Admin
        </Badge>
      );
    default:
      return (
        <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none shadow-none font-semibold gap-1">
          <UserCircle className="w-3 h-3" />
          Customer
        </Badge>
      );
  }
};

export function UserManagement() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [adminCreateUser, { isLoading: isCreating }] = useAdminCreateUserMutation();
  const [updateUserRole, { isLoading: isUpdatingRole }] = useUpdateUserRoleMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [verifiedFilter, setVerifiedFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  // Add User Form State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"CUSTOMER" | "ADMIN" | "SUPER_ADMIN">("ADMIN");



  // Filtering
  const filteredUsers = useMemo(() => {
    const users = data?.users ?? [];
    return users.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      const matchesVerified =
        verifiedFilter === "ALL" ||
        (verifiedFilter === "VERIFIED" && user.emailVerified) ||
        (verifiedFilter === "UNVERIFIED" && !user.emailVerified);

      return matchesSearch && matchesRole && matchesVerified;
    });
  }, [data?.users, searchTerm, roleFilter, verifiedFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleVerifiedFilterChange = (value: string) => {
    setVerifiedFilter(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete.id).unwrap();
      toast.success(`User ${userToDelete.name ?? ""} deleted successfully.`);
    } catch {
      toast.error("Failed to delete user.");
    } finally {
      setUserToDelete(null);
    }
  };
  
  const handleRoleChange = async (userId: string, newRole: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN") => {
    try {
      await updateUserRole({ id: userId, role: newRole }).unwrap();
      toast.success("User role updated successfully.");
    } catch {
      toast.error("Failed to update user role.");
    }
  };
  
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    try {
      await adminCreateUser({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      }).unwrap();
      
      toast.success("User created successfully.");
      setIsAddUserOpen(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("ADMIN");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to create user.");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Failed to load users
          </h3>
          <p className="text-slate-500">
            Something went wrong while fetching users. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h1>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleCreateUser}>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new admin or customer account manually.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="john@example.com" 
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••" 
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm font-medium">Role</label>
                  <Select 
                    value={newUserRole} 
                    onValueChange={(val: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN") => setNewUserRole(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUSTOMER">Customer</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters Bar */}
      <Card className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10 h-10 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
              <SelectTrigger className="h-10 w-full md:w-[160px] border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <SelectValue placeholder="Role" />
                </div>
              </SelectTrigger>
              <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-[100]">
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>

            {/* Verified Filter */}
            <Select value={verifiedFilter} onValueChange={handleVerifiedFilterChange}>
              <SelectTrigger className="h-10 w-full md:w-[180px] border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <SelectValue placeholder="Verification" />
                </div>
              </SelectTrigger>
              <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-[100]">
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="VERIFIED">Verified</SelectItem>
                <SelectItem value="UNVERIFIED">Unverified</SelectItem>
              </SelectContent>
            </Select>

            {/* Result count */}
            <div className="ml-auto hidden md:block">
              <span className="text-sm text-slate-500 font-medium">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-none shadow-md bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Users className="w-5 h-5 text-primary" />
            All Users
            <Badge variant="outline" className="ml-2 font-mono text-xs">
              {filteredUsers.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {paginatedUsers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Email Verified</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginatedUsers.map((user: User) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center shrink-0 ring-1 ring-slate-200 dark:ring-slate-700">
                            <span className="text-sm font-bold text-primary">
                              {(user.name ?? user.email)?.[0]?.toUpperCase() ?? "?"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {user.name ?? "—"}
                            </span>
                            <span className="text-xs text-slate-500 truncate max-w-[200px]">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Select
                          value={user.role}
                          onValueChange={(val: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN") => handleRoleChange(user.id, val)}
                          disabled={user.role === "SUPER_ADMIN" || isUpdatingRole}
                        >
                          <SelectTrigger className="w-[140px] h-8 border-slate-200 dark:border-slate-800 shadow-none bg-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-[100] min-w-[var(--radix-select-trigger-width)]">
                            <SelectItem value="CUSTOMER">
                              {getRoleBadge("CUSTOMER")}
                            </SelectItem>
                            <SelectItem value="ADMIN">
                              {getRoleBadge("ADMIN")}
                            </SelectItem>
                            <SelectItem value="SUPER_ADMIN" disabled>
                              {getRoleBadge("SUPER_ADMIN")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.emailVerified ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-semibold">Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400">
                            <XCircle className="w-4 h-4" />
                            <span className="text-xs font-semibold">Unverified</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setUserToDelete(user)}
                            disabled={isDeleting || user.role === "SUPER_ADMIN"}
                            className={cn(
                              "p-2 rounded-lg transition-colors group",
                              user.role === "SUPER_ADMIN"
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:bg-red-50 dark:hover:bg-red-950/30"
                            )}
                          >
                            <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Rows per page:</span>
                <Select
                  value={String(itemsPerPage)}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="h-8 w-[70px] border-slate-200 dark:border-slate-800 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-[100]">
                    {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={String(opt)}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-slate-200 dark:border-slate-800"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-slate-200 dark:border-slate-800"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900 dark:text-white">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 dark:text-slate-400">
              This action cannot be undone. This will permanently delete the account for{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {userToDelete?.name || userToDelete?.email}
              </span>
              {' '}and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800" disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDelete();
              }}
              className="bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
