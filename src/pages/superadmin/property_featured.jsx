import React, { useState, useEffect } from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatCard } from "../../components/dashboard/StatCard";
import { DataTable, StatusBadge, TableToolbar } from "../../components/dashboard/DataTable";
import { Sparkles, TrendingUp, Eye, MousePointerClick, Plus, Calendar, MoreVertical, Edit, Trash2, X, Loader2 } from "lucide-react";

const getApiUrl = () =>
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://api.roomhy.com";

export default function FeaturedListings() {
  const [featured, setFeatured] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    propertyId: "", propertyTitle: "", propertyImage: "", city: "", startDate: "", endDate: "", position: 0, paymentAmount: 0, paymentStatus: "pending", notes: "", isActive: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [listRes, propRes] = await Promise.all([
        fetch(`${getApiUrl()}/api/featured`),
        fetch(`${getApiUrl()}/api/featured/available-properties`)
      ]);
      const listData = await listRes.json();
      const propData = await propRes.json();
      if (listData.success) setFeatured(listData.data);
      if (propData.success) setProperties(propData.data);
    } catch (err) { console.error("Error:", err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `${getApiUrl()}/api/featured/${editingId}` : `${getApiUrl()}/api/featured`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) { fetchData(); closeModal(); }
      else { alert(data.message); }
    } catch (err) { alert("Error saving"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this featured listing?")) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/featured/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchData();
    } catch (err) { alert("Error deleting"); }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({
        propertyId: item.propertyId?._id || item.propertyId || "",
        propertyTitle: item.propertyTitle,
        propertyImage: item.propertyImage || "",
        city: item.city || "",
        startDate: item.startDate?.split("T")[0] || "",
        endDate: item.endDate?.split("T")[0] || "",
        position: item.position || 0,
        paymentAmount: item.paymentAmount || 0,
        paymentStatus: item.paymentStatus || "pending",
        notes: item.notes || "",
        isActive: item.isActive
      });
    } else {
      setEditingId(null);
      setFormData({
        propertyId: "", propertyTitle: "", propertyImage: "", city: "", startDate: "", endDate: "", position: 0, paymentAmount: 0, paymentStatus: "pending", notes: "", isActive: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingId(null); };

  const handlePropertySelect = (e) => {
    const prop = properties.find(p => p._id === e.target.value);
    if (prop) {
      setFormData({
        ...formData,
        propertyId: prop._id,
        propertyTitle: prop.title,
        propertyImage: prop.image || "",
        city: prop.city || ""
      });
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN") : "-";
  const isExpired = (d) => d && new Date(d) < new Date();
  const activeCount = featured.filter(l => l.isActive && !isExpired(l.endDate)).length;
  const totalViews = featured.reduce((sum, f) => sum + (f.views || 0), 0);
  const totalClicks = featured.reduce((sum, f) => sum + (f.clicks || 0), 0);
  const conversionRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : "0.00";

  const tableData = featured.map(f => ({
    ...f,
    views: f.views || 0,
    clicks: f.clicks || 0,
    start: formatDate(f.startDate),
    end: formatDate(f.endDate),
    plan: f.paymentStatus === "paid" ? "Premium" : "Basic",
    owner: f.city || "-"
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <PageHeader
        title="Featured Listings"
        subtitle="Manage promoted and featured property listings."
        actions={<button onClick={() => openModal()} className="h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:opacity-90"><Plus className="h-4 w-4" /> Add Featured</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Active Featured" value={activeCount.toString()} delta="+6 this month" trend="up" icon={Sparkles} iconColor="purple" />
        <StatCard label="Total Views" value={totalViews.toString()} delta="+18.4%" trend="up" icon={Eye} iconColor="blue" />
        <StatCard label="Total Clicks" value={totalClicks.toString()} delta="+12.6%" trend="up" icon={MousePointerClick} iconColor="green" />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} delta="+0.8%" trend="up" icon={TrendingUp} iconColor="yellow" />
      </div>

      <div className="panel">
        <TableToolbar searchPlaceholder="Search featured..." filters={[{ label: "Plan", value: "All" }]} />
        <DataTable data={tableData} columns={[
          { key: "id", header: "ID", render: (r) => <span className="font-medium">F-{String(r._id || "").slice(-4)}</span> },
          { key: "title", header: "Property", render: (r) => <div><div className="font-medium">{r.propertyTitle}</div><div className="text-xs text-muted-foreground">{r.owner}</div></div> },
          { key: "plan", header: "Plan", render: (r) => <StatusBadge status={r.plan} /> },
          { key: "views", header: "Views", render: (r) => <span className="font-medium">{r.views.toLocaleString()}</span> },
          { key: "clicks", header: "Clicks", render: (r) => <span className="font-medium">{r.clicks.toLocaleString()}</span> },
          { key: "period", header: "Period", render: (r) => <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />{r.start} - {r.end}</div> },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={isExpired(r.endDate) ? "Expired" : (r.isActive ? "Active" : "Inactive")} /> },
          { key: "actions", header: "", render: (r) => (
            <div className="flex gap-1 justify-end">
              <button onClick={() => openModal(r)} className="p-1.5 rounded hover:bg-muted"><Edit className="h-4 w-4 text-muted-foreground" /></button>
              <button onClick={() => handleDelete(r._id)} className="p-1.5 rounded hover:bg-muted"><Trash2 className="h-4 w-4 text-red-500" /></button>
            </div>
          ), className: "text-right" },
        ]} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold">{editingId ? "Edit Featured" : "Add Featured Listing"}</h3>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Property *</label>
                <select value={formData.propertyId} onChange={handlePropertySelect} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" required>
                  <option value="">Select a property</option>
                  {properties.map(p => <option key={p._id} value={p._id}>{p.title} - {p.city}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                  <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input type="number" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment (Rs.)</label>
                  <input type="number" value={formData.paymentAmount} onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                <select value={formData.paymentStatus} onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none">
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="expired">Expired</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 outline-none" rows="2"></textarea>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                <span className="text-sm">Active</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
