"use client";

import { useState } from "react";
import { updateSettings } from "../services/api/settings";
interface Props {
  settings: any;
  onSuccess: () => void;
}

export default function SettingsForm({
  settings,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    ...settings,
  });

  function handleChange(
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement
  >
) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function save(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  try {
    setLoading(true);

    await updateSettings(form);

    alert("Settings Updated");

    onSuccess();
  } catch (err) {
    console.log(err);

    alert("Failed");
  } finally {
    setLoading(false);
  }
}

  return (

    <form
      onSubmit={save}
      className="space-y-5"
    >

      <input
        name="websiteName"
        value={form.websiteName || ""}
        onChange={handleChange}
        placeholder="Website Name"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="email"
        value={form.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="phone"
        value={form.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="address"
        value={form.address || ""}
        onChange={handleChange}
        placeholder="Address"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="facebook"
        value={form.facebook || ""}
        onChange={handleChange}
        placeholder="Facebook URL"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="instagram"
        value={form.instagram || ""}
        onChange={handleChange}
        placeholder="Instagram URL"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="youtube"
        value={form.youtube || ""}
        onChange={handleChange}
        placeholder="Youtube URL"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="linkedin"
        value={form.linkedin || ""}
        onChange={handleChange}
        placeholder="LinkedIn URL"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="footerText"
        value={form.footerText || ""}
        onChange={handleChange}
        placeholder="Footer Text"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="seoTitle"
        value={form.seoTitle || ""}
        onChange={handleChange}
        placeholder="SEO Title"
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="seoDescription"
        value={form.seoDescription || ""}
        onChange={handleChange}
        placeholder="SEO Description"
        className="w-full border rounded-lg p-3"
      />

      <button
        disabled={loading}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>

    </form>

  );

}
