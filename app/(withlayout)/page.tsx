'use client';

import React from 'react';
import {
  Users,
  UserPlus,
  FileText,
  ShieldCheck,
  TrendingUp,
  Clock,
  GraduationCap,
  Award,
  Database,
  Zap,
} from 'lucide-react';

function FeatureCard({ 
  icon: Icon, 
  title, 
  description,
  className = "" 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  className?: string;
}) {
  return (
    <div className={`group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}>
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-400/30 rounded-2xl flex items-center justify-center mb-6 border-2 border-orange-500/30 group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-orange-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  number, 
  label 
}: { 
  icon: React.ElementType; 
  number: string; 
  label: string;
}) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-orange-400/5 backdrop-blur-sm rounded-2xl border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-300">
      <div className="w-20 h-20 bg-gradient-to-br from-orange-500/30 to-orange-400/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-orange-500/40 shadow-xl">
        <Icon className="w-10 h-10 text-orange-300" />
      </div>
      <div className="text-4xl font-black bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent mb-2 tracking-wide">
        {number}
      </div>
      <p className="text-white/90 font-semibold text-lg">{label}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0a0e1a', color: 'white' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-blue-900/20 to-purple-900/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20"> 
            
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-orange-200 to-yellow-200 bg-clip-text text-transparent mb-8 leading-tight">
              Employee Management System
              <span className="block bg-gradient-to-r from-orange-400 to-orange-500 text-4xl md:text-xl">System</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Streamline HR operations with secure CRUD functionality, advanced validation, and role-based access control for complete employee lifecycle management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="cursor-default group px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3">
                <Zap className="w-6 h-6 group-hover:scale-110" />
                Get Started
              </button>
              <button className="cursor-default px-12 py-6 border-2 border-white/30 text-white text-lg font-bold rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center gap-3">
                Live Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-orange-200 to-yellow-100 bg-clip-text text-transparent mb-6">
              Complete Employee Lifecycle
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              From onboarding to performance reviews, manage every aspect with enterprise-grade security and validation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            <FeatureCard
              icon={UserPlus}
              title="Seamless Onboarding"
              description="Streamlined employee onboarding with automated workflows, document management, and role assignment."
            />
            <FeatureCard
              icon={FileText}
              title="Advanced CRUD Operations"
              description="Create, read, update, and delete employee records with full audit trails and revision history."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Enterprise Security"
              description="Role-based access control, data encryption, and compliance-ready validation for sensitive HR data."
            />
            <FeatureCard
              icon={GraduationCap}
              title="Performance Management"
              description="Track goals, reviews, and development plans with comprehensive performance analytics."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Real-time Analytics"
              description="Interactive dashboards with employee metrics, turnover analysis, and workforce insights."
            />
            <FeatureCard
              icon={Clock}
              title="Time & Attendance"
              description="Automated time tracking, leave management, and compliance monitoring with instant notifications."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-blue-900/20 to-purple-900/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 md:p-20">
            <Award className="w-24 h-24 mx-auto mb-8 text-orange-400 opacity-80" />
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent mb-6">
              Ready to Transform HR?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of organizations using EmployeeHub to manage their workforce with unmatched security and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="cursor-default px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xl font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-2 transition-all duration-500 flex items-center justify-center gap-3 w-full sm:w-auto">
                Start Free Trial
              </button>
              <button className="cursor-default px-12 py-6 border-2 border-orange-500/50 text-orange-300 text-xl font-bold rounded-2xl backdrop-blur-sm hover:bg-orange-500/20 hover:border-orange-500/80 hover:text-orange-200 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto">
                View Features
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
