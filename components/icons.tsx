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
