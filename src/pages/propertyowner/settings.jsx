import React, { useEffect, useState } from "react";
import PropertyOwnerLayout from "../../components/propertyowner/PropertyOwnerLayout";
import { clearOwnerRuntimeSession, getOwnerRuntimeSession } from "../../utils/propertyowner";
import { ownerApi } from "../../services/api";
import { Building, UserCog, Shield, Lock, Check, Landmark, Eye, EyeOff, ExternalLink } from "lucide-react";

function FieldRow({ label, value, masked, empty }) {
  const [show, setShow] = useState(false);
  const display = !value ? (
    <span className="text-muted-foreground/50 italic text-xs">Not provided</span>
  ) : masked ? (
    show ? value : "••••••" + String(value).slice(-4)
  ) : value;

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0 gap-4">
      <span className="text-xs text-muted-foreground font-medium w-40 shrink-0">{label}</span>
      <div className="flex items-center gap-2 flex-1 justify-end">
        <span className="text-[13px] font-semibold text-foreground text-right">{display}</span>
        {masked && value && (
          <button onClick={() => setShow(v => !v)} className="text-muted-foreground hover:text-foreground transition-colors">
            {show ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Settings() {
  const owner = getOwnerRuntimeSession();

  if (!owner?.loginId && typeof window !== "undefined") {
    window.location.href = "/propertyowner/ownerlogin";
    return null;
  }

  const [settings, setSettings] = useState({
    automaticRentReminders: true,
    maintenanceNotifications: true,
    emailNotifications: "all",
    language: "en",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [bankData, setBankData]       = useState(null);
  const [bankLoading, setBankLoading] = useState(true);

  useEffect(() => {
    ownerApi.getOwner(owner.loginId)
      .then(data => setBankData({
        accountHolder: data.checkinAccountHolderName || data.accountHolderName || "",
        bankName:      data.checkinBankName      || data.bankName      || "",
        branchName:    data.checkinBranchName    || data.branchName    || "",
        accountNumber: data.checkinBankAccountNumber || data.accountNumber || "",
        ifscCode:      data.checkinIfscCode      || data.ifscCode      || "",
        upiId:         data.checkinUpiId         || data.upiId         || "",
        locked:        !!data.bankLockedByVisit,
      }))
      .catch(() => setBankData(null))
      .finally(() => setBankLoading(false));
  }, [owner.loginId]);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const hasBank = bankData && (
    bankData.accountHolder || bankData.bankName || bankData.accountNumber || bankData.upiId
  );

  return (
    <PropertyOwnerLayout
      owner={owner}
      title="Settings"
      onLogout={() => { clearOwnerRuntimeSession(); window.location.href = "/propertyowner/ownerlogin"; }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-[38px] md:text-[44px] leading-[1.05] text-foreground">Settings</h1>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">App preferences and configuration parameters.</p>
          </div>
          <button
            onClick={handleSave}
            className="px-5 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 text-xs self-start sm:self-center"
          >
            {saveSuccess ? <><Check className="w-4 h-4" /> Saved!</> : "Save Changes"}
          </button>
        </div>

        <div className="space-y-6">

          {/* Property Settings */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft">
            <h3 className="text-[16px] font-bold text-foreground mb-4 flex items-center gap-2.5">
              <Building className="w-5 h-5 text-primary" />
              Property Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/20">
                <div>
                  <p className="font-bold text-sm text-foreground">Automatic Rent Reminders</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Send automatic reminders to tenants</p>
                </div>
                <input type="checkbox" checked={settings.automaticRentReminders} id="reminderCheck"
                  onChange={e => setSettings(p => ({ ...p, automaticRentReminders: e.target.checked }))}
                  className="size-5 rounded border-border text-primary focus:ring-0 cursor-pointer accent-primary" />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-muted/20">
                <div>
                  <p className="font-bold text-sm text-foreground">Maintenance Notifications</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Receive alerts for maintenance requests</p>
                </div>
                <input type="checkbox" checked={settings.maintenanceNotifications} id="maintCheck"
                  onChange={e => setSettings(p => ({ ...p, maintenanceNotifications: e.target.checked }))}
                  className="size-5 rounded border-border text-primary focus:ring-0 cursor-pointer accent-primary" />
              </div>
            </div>
          </div>

          {/* Payment & Banking — pulled from KYC */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-foreground flex items-center gap-2.5">
                <Landmark className="w-5 h-5 text-primary" />
                Payment &amp; Banking
              </h3>
              <a
                href="/propertyowner/kyc-verification"
                className="inline-flex items-center gap-1 text-[11.5px] text-primary font-medium hover:underline"
              >
                Update via KYC <ExternalLink className="size-3" />
              </a>
            </div>

            {bankLoading ? (
              <div className="text-[13px] text-muted-foreground py-4 text-center">Loading...</div>
            ) : !hasBank ? (
              <div className="rounded-xl border border-dashed border-border p-5 text-center">
                <p className="text-[13px] text-muted-foreground mb-2">No bank details found.</p>
                <a href="/propertyowner/kyc-verification" className="text-[12px] text-primary font-medium hover:underline">
                  Complete KYC to add your bank account →
                </a>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-muted/20 px-4 py-1">
                <FieldRow label="Account Holder"  value={bankData.accountHolder} />
                <FieldRow label="Bank Name"        value={bankData.bankName} />
                <FieldRow label="Branch"           value={bankData.branchName} />
                <FieldRow label="Account Number"   value={bankData.accountNumber} masked />
                <FieldRow label="IFSC Code"        value={bankData.ifscCode} />
                <FieldRow label="UPI ID"           value={bankData.upiId} />
              </div>
            )}

            {bankData?.locked && (
              <p className="text-[11.5px] text-amber-600 mt-3 flex items-center gap-1.5">
                <Lock className="size-3" />
                Bank details are locked by your KYC submission. Contact support to update.
              </p>
            )}
          </div>

          {/* Account Settings */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft">
            <h3 className="text-[16px] font-bold text-foreground mb-4 flex items-center gap-2.5">
              <UserCog className="w-5 h-5 text-primary" />
              Account Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Email Notifications</label>
                <select className="w-full h-11 px-4 border border-border bg-card rounded-xl text-foreground text-sm focus:ring-2 focus:ring-primary/20 outline-none transition"
                  value={settings.emailNotifications}
                  onChange={e => setSettings(p => ({ ...p, emailNotifications: e.target.value }))}>
                  <option value="all">All Activities</option>
                  <option value="important">Important Only</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Language</label>
                <select className="w-full h-11 px-4 border border-border bg-card rounded-xl text-foreground text-sm focus:ring-2 focus:ring-primary/20 outline-none transition"
                  value={settings.language}
                  onChange={e => setSettings(p => ({ ...p, language: e.target.value }))}>
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="border border-border bg-card rounded-2xl p-6 shadow-soft">
            <h3 className="text-[16px] font-bold text-foreground mb-4 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-primary" />
              Privacy &amp; Security
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-border rounded-xl bg-muted/20 gap-4">
              <div>
                <p className="font-bold text-sm text-foreground">Password Update</p>
                <p className="text-xs text-muted-foreground mt-0.5">Secure your account by updating your credentials regularly.</p>
              </div>
              <button type="button"
                className="px-4 h-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-semibold text-xs transition-colors shrink-0 flex items-center gap-2 self-start sm:self-center">
                <Lock className="w-3.5 h-3.5" />
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </PropertyOwnerLayout>
  );
}
