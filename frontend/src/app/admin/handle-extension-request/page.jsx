"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const HandleExtensionRequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState("");
    const [toast, setToast] = useState({ type: "", message: "" });

    // Fetch all pending extension requests
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_BASE}/extensions?published=false&admin=1`)
            .then((res) => setRequests(res.data))
            .catch(() => setRequests([]))
            .finally(() => setLoading(false));
    }, [toast]);

    // Approve or reject a request
    const handleAction = async (id, action) => {
        setActionLoading(id + action);
        try {
            await axios.put(`${API_BASE}/admin/handle-request/${id}`, { action });
            setToast({
                type: "success",
                message: `Request ${action === "approve" ? "approved" : "rejected"}!`,
            });
        } catch {
            setToast({ type: "error", message: `Failed to ${action} request.` });
        }
        setActionLoading("");
    };

    // Toast auto-dismiss
    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => setToast({ type: "", message: "" }), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="min-h-screen bg-white py-12 px-4">
            <div className="max-w-4xl mx-auto bg-black/30 rounded-2xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-8">Handle Extension Requests</h1>
                {/* Toast */}
                {toast.message && (
                    <div
                        className={`mb-4 px-4 py-2 rounded text-white font-semibold ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
                    >
                        {toast.message}
                    </div>
                )}
                {loading ? (
                    <div className="text-gray-300">Loading requests...</div>
                ) : requests.length === 0 ? (
                    <div className="text-gray-400">No pending extension requests.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2">Logo</th>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Publisher</th>
                                    <th className="py-2">Identifier</th>
                                    <th className="py-2">Version</th>
                                    <th className="py-2">Description</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req._id} className="border-t border-indigo-900">
                                        <td className="py-2">
                                            {req.logo ? (
                                                <img
                                                    src={req.logo}
                                                    alt="Logo"
                                                    className="h-12 w-12 rounded shadow bg-white object-contain"
                                                />
                                            ) : (
                                                <span className="text-gray-500">N/A</span>
                                            )}
                                        </td>
                                        <td className="py-2 font-bold text-white">{req.name}</td>
                                        <td className="py-2">{req.publisher || <span className="text-gray-500">N/A</span>}</td>
                                        <td className="py-2">{req.identifier}</td>
                                        <td className="py-2">{req.version}</td>
                                        <td className="py-2 max-w-xs truncate" title={req.description}>{req.description}</td>
                                        <td className="py-2 flex gap-2">
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow text-sm disabled:opacity-60"
                                                disabled={actionLoading === req._id + "approve"}
                                                onClick={() => handleAction(req._id, "approve")}
                                            >
                                                {actionLoading === req._id + "approve" ? "Approving..." : "Approve"}
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow text-sm disabled:opacity-60"
                                                disabled={actionLoading === req._id + "reject"}
                                                onClick={() => handleAction(req._id, "reject")}
                                            >
                                                {actionLoading === req._id + "reject" ? "Rejecting..." : "Reject"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HandleExtensionRequestPage;