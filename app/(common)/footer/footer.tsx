'use client';

import React from 'react';
import {
  Users,
  FileText,
  ShieldCheck,
  Clock,
  Users2,
  GraduationCap,
  Award,
  TrendingUp,
} from 'lucide-react';

function StatCard({ icon: Icon, number, label }: { icon: React.ElementType; number: string; label: string }) {
  return (
    <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-400/30 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-orange-500/30">
        <Icon className="w-8 h-8 text-orange-400" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-white to-orange-200/80 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <p className="text-white/80 font-medium">{label}</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="text-white py-20" style={{ backgroundColor: '#020617' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <StatCard icon={Users} number="10K+" label="Employees" />
          <StatCard icon={FileText} number="50K+" label="Records" />
          <StatCard icon={ShieldCheck} number="100%" label="Secure" />
          <StatCard icon={Clock} number="24/7" label="Access" />
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
              EmployeeHub
            </h3>
            <p className="text-white/70 mb-8 leading-relaxed">
              Complete employee management system with secure CRUD operations, advanced validation, and role-based access control.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Users2 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                <GraduationCap className="w-6 h-6 text-green-400" />
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Quick Access</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group cursor-default hover:text-orange-400 transition-colors">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                <span className="text-white/80 font-medium">Dashboard</span>
              </li>
              <li className="flex items-center gap-3 group cursor-default hover:text-orange-400 transition-colors">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                <span className="text-white/80 font-medium">Employees</span>
              </li>
              <li className="flex items-center gap-3 group cursor-default hover:text-orange-400 transition-colors">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                <span className="text-white/80 font-medium">Reports</span>
              </li>
              <li className="flex items-center gap-3 group cursor-default hover:text-orange-400 transition-colors">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-110 transition-transform"></div>
                <span className="text-white/80 font-medium">Settings</span>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Features</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80">
                <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span>Secure CRUD Operations</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span>Real-time Validation</span>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <Users className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-400" />
                <span>Role-based Access</span>
              </li>
            </ul>
          </div>

          {/* Contact/Support */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Support</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-400/30 rounded-xl flex items-center justify-center border-2 border-emerald-500/30">
                  <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">24/7 Support</p>
                  <p className="text-white/70 text-sm">Available anytime</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <p className="text-white/80 font-mono text-sm bg-gradient-to-r from-orange-400/30 to-orange-500/30 px-3 py-1 rounded-lg inline-block">
                  v2.0.1
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-white/50">
              © 2026 EmployeeHub. All rights reserved. Built for secure employee management.
            </p>
            <div className="flex gap-8 text-white/60">
              <span className="cursor-default hover:text-white/80 transition-colors">Privacy</span>
              <span className="cursor-default hover:text-white/80 transition-colors">Terms</span>
              <span className="cursor-default hover:text-white/80 transition-colors">Security</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
