import React from 'react';

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-chart-pie ${className}`}></i>
);

export const TrainersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-dumbbell ${className}`}></i>
);

export const ClientsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-users ${className}`}></i>
);

export const PackagesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-box-archive ${className}`}></i>
);

export const ReportsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-file-invoice-dollar ${className}`}></i>
);

export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-bell ${className}`}></i>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-gear ${className}`}></i>
);

export const PaletteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-palette ${className}`}></i>
);

export const LanguageIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-language ${className}`}></i>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-sun ${className}`}></i>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-moon ${className}`}></i>
);


export const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);