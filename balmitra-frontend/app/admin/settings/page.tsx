"use client";

import { useEffect, useState } from "react";
import { getSettings } from "../services/api/settings";
import SettingsForm from "./SettingsForm";

export default function SettingsPage() {

  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  async function load() {

    try {

      const data =
        await getSettings();

      setSettings(data);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    load();

  }, []);

  if (loading)

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">

        Website Settings

      </h1>

      <div className="bg-white rounded-xl shadow p-8">

        <SettingsForm

          settings={settings}

          onSuccess={load}

        />

      </div>

    </div>

  );

}