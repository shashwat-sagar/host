import React, { useState } from 'react'
import { Test } from 'deo/Components';
import { ThemeDrawer, ThemeSettingsButton } from "../theme";

const Theme = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 text-2xl font-bold items-center justify-center bg-theme-bg">
        <h1 className="text-primary-700">Hello from HOST 1</h1>

        {/* Demo: Show primary color variants */}
        <div className="flex gap-2 mt-4">
          <div className="w-12 h-12 rounded-lg bg-primary-100 border border-primary-200" title="primary-100" />
          <div className="w-12 h-12 rounded-lg bg-primary-300" title="primary-300" />
          <div className="w-12 h-12 rounded-lg bg-primary-500" title="primary-500" />
          <div className="w-12 h-12 rounded-lg bg-primary-700" title="primary-700" />
          <div className="w-12 h-12 rounded-lg bg-primary-900" title="primary-900" />
        </div>

        {/* Demo: Text with opacity variants */}
        <p className="text-primary-500 text-lg font-normal mt-4">
          This text uses primary-500 color
        </p>
        <p className="text-primary-500/50 text-lg font-normal">
          This text uses primary-500 with 50% opacity
        </p>

        {/* Demo: Theme-aware text */}
        <p className="text-theme-text-secondary text-base font-normal mt-2">
          This text adapts to light/dark mode
        </p>

        <Test />

        {/* Theme Settings Button & Drawer */}
        <ThemeSettingsButton onClick={() => setDrawerOpen(true)} />
        <ThemeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
  )
}

export default Theme