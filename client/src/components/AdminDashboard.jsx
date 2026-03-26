import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Truck, Users, ShieldCheck, Trash2, ArrowUpDown } from "lucide-react";

const API = "http://localhost:5000/api/admin";

function getAuthHeaders() {
  const token = sessionStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card className="border border-orange-100 dark:border-orange-900/30">
    <CardContent className="flex items-center gap-4 p-6">
      <div className={`rounded-xl p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { userId } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [towTrucks, setTowTrucks] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/stats`, { headers: getAuthHeaders() });
      setStats(res.data);
    } catch (err) {
      console.error("Stats error:", err);
      setError("Failed to load stats");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`, { headers: getAuthHeaders() });
      setUsers(res.data);
    } catch (err) {
      console.error("Users error:", err);
    }
  };

  const fetchTowTrucks = async () => {
    try {
      const res = await axios.get(`${API}/towtrucks`, { headers: getAuthHeaders() });
      setTowTrucks(res.data);
    } catch (err) {
      console.error("TowTrucks error:", err);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchUsers(), fetchTowTrucks()]);
      setLoading(false);
    };
    loadAll();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user and all their tow trucks?")) return;
    try {
      await axios.delete(`${API}/users/${id}`, { headers: getAuthHeaders() });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setTowTrucks((prev) => prev.filter((t) => t.user?._id !== id));
      fetchStats();
    } catch (err) {
      console.error("Delete user error:", err);
      alert(err.response?.data?.error || "Failed to delete user");
    }
  };

  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const res = await axios.patch(
        `${API}/users/${id}/role`,
        { role: newRole },
        { headers: getAuthHeaders() }
      );
      setUsers((prev) => prev.map((u) => (u._id === id ? res.data : u)));
      fetchStats();
    } catch (err) {
      console.error("Role update error:", err);
      alert(err.response?.data?.error || "Failed to update role");
    }
  };

  const handleDeleteTowTruck = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tow truck?")) return;
    try {
      await axios.delete(`${API}/towtrucks/${id}`, { headers: getAuthHeaders() });
      setTowTrucks((prev) => prev.filter((t) => t._id !== id));
      fetchStats();
    } catch (err) {
      console.error("Delete towtruck error:", err);
      alert(err.response?.data?.error || "Failed to delete tow truck");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 dark:border-orange-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400 mt-8 text-lg">{error}</div>;
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "Users" },
    { id: "towtrucks", label: "Tow Trucks" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage users, tow trucks, and monitor activity.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-orange-50 dark:bg-neutral-900 p-1 rounded-lg w-fit border border-orange-100 dark:border-orange-900/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white dark:bg-neutral-800 text-orange-700 dark:text-orange-400 shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="bg-orange-600 dark:bg-orange-700" />
            <StatCard title="Total Tow Trucks" value={stats.totalTowTrucks} icon={Truck} color="bg-red-600 dark:bg-red-700" />
            <StatCard title="Admins" value={stats.totalAdmins} icon={ShieldCheck} color="bg-orange-800 dark:bg-orange-900" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-orange-100 dark:border-orange-900/30">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Last 5 registered users</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentUsers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No users yet.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.recentUsers.map((u) => (
                      <div key={u._id} className="flex items-center justify-between p-3 rounded-lg bg-orange-50/50 dark:bg-neutral-900">
                        <div>
                          <p className="font-medium text-sm">{u.username}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          u.role === "admin"
                            ? "bg-orange-200 text-orange-900 dark:bg-orange-900 dark:text-orange-300"
                            : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                        }`}>
                          {u.role}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-orange-100 dark:border-orange-900/30">
              <CardHeader>
                <CardTitle>Recent Tow Trucks</CardTitle>
                <CardDescription>Last 5 added tow trucks</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentTowTrucks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No tow trucks yet.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.recentTowTrucks.map((t) => (
                      <div key={t._id} className="flex items-center justify-between p-3 rounded-lg bg-orange-50/50 dark:bg-neutral-900">
                        <div>
                          <p className="font-medium text-sm">{t.businessName}</p>
                          <p className="text-xs text-muted-foreground">{t.phoneNumber} &bull; {t.user?.username || "Unknown"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <Card className="border border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
            <CardDescription>Manage user accounts and roles</CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-muted-foreground">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-100 dark:border-orange-900/30">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Username</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Role</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Joined</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b border-orange-50 dark:border-neutral-800 last:border-b-0 hover:bg-orange-50/50 dark:hover:bg-neutral-900 transition-colors">
                        <td className="py-3 px-2 font-medium">{u.username}</td>
                        <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                        <td className="py-3 px-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            u.role === "admin"
                              ? "bg-orange-200 text-orange-900 dark:bg-orange-900 dark:text-orange-300"
                              : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex justify-end gap-2">
                            {u._id !== userId && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleToggleRole(u._id, u.role)}
                                  title="Toggle role"
                                  className="border-orange-200 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-800 dark:hover:bg-orange-950 dark:hover:text-orange-400"
                                >
                                  <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                                  {u.role === "admin" ? "Demote" : "Promote"}
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteUser(u._id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </>
                            )}
                            {u._id === userId && (
                              <span className="text-xs text-muted-foreground italic py-1">You</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tow Trucks Tab */}
      {activeTab === "towtrucks" && (
        <Card className="border border-orange-100 dark:border-orange-900/30">
          <CardHeader>
            <CardTitle>All Tow Trucks ({towTrucks.length})</CardTitle>
            <CardDescription>Manage all tow truck listings</CardDescription>
          </CardHeader>
          <CardContent>
            {towTrucks.length === 0 ? (
              <p className="text-muted-foreground">No tow trucks found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-100 dark:border-orange-900/30">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Business Name</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Phone</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Owner</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Location</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Created</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {towTrucks.map((t) => (
                      <tr key={t._id} className="border-b border-orange-50 dark:border-neutral-800 last:border-b-0 hover:bg-orange-50/50 dark:hover:bg-neutral-900 transition-colors">
                        <td className="py-3 px-2 font-medium">{t.businessName}</td>
                        <td className="py-3 px-2 text-muted-foreground">
                          <a href={`tel:${t.phoneNumber}`} className="hover:underline hover:text-orange-700 dark:hover:text-orange-400">{t.phoneNumber}</a>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">{t.user?.username || "Unknown"}</td>
                        <td className="py-3 px-2 text-muted-foreground text-xs">
                          {t.coords ? `${t.coords.lat?.toFixed(4)}, ${t.coords.lng?.toFixed(4)}` : "N/A"}
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex justify-end">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteTowTruck(t._id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
